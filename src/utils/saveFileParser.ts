/**
 * 暗黑地牢存档文件解析工具
 * 处理 persist.game.json 格式的存档文件
 */

export interface ModInfo {
  id: string;
  name: string;
  version?: string;
}

export interface SaveFileData {
  mods: ModInfo[];
  rawContent: string;
}

/**
 * 从 persist.game.json 文件内容中提取 MOD 列表
 * 暗黑地牢使用特殊的 JSON 格式，需要特殊处理
 */
export function extractModsFromSaveFile(fileContent: string): ModInfo[] {
  try {
    // 尝试解析为标准 JSON
    const data = JSON.parse(fileContent);
    
    // 查找 MOD 相关的字段
    // 常见的字段名称：mods, modlist, mod_list, mod_order, enabled_mods
    let mods: any[] = [];
    
    if (data.mods && Array.isArray(data.mods)) {
      mods = data.mods;
    } else if (data.modlist && Array.isArray(data.modlist)) {
      mods = data.modlist;
    } else if (data.mod_list && Array.isArray(data.mod_list)) {
      mods = data.mod_list;
    } else if (data.enabled_mods && Array.isArray(data.enabled_mods)) {
      mods = data.enabled_mods;
    }
    
    // 转换为标准格式
    return mods.map((mod: any, index: number) => {
      if (typeof mod === 'string') {
        return {
          id: mod,
          name: mod,
          version: undefined
        };
      } else if (typeof mod === 'object') {
        return {
          id: mod.id || mod.uuid || mod.name || `mod_${index}`,
          name: mod.name || mod.id || `MOD ${index + 1}`,
          version: mod.version || undefined
        };
      }
      return {
        id: `mod_${index}`,
        name: `MOD ${index + 1}`,
        version: undefined
      };
    });
  } catch (error) {
    console.error('Failed to parse save file:', error);
    return [];
  }
}

/**
 * 将 MOD 列表写回到存档文件内容中
 */
export function updateModsInSaveFile(
  fileContent: string,
  newMods: ModInfo[]
): string {
  try {
    const data = JSON.parse(fileContent);
    
    // 确定使用哪个字段来存储 MOD 列表
    if (data.mods !== undefined) {
      data.mods = newMods.map(mod => ({
        id: mod.id,
        name: mod.name,
        ...(mod.version && { version: mod.version })
      }));
    } else if (data.modlist !== undefined) {
      data.modlist = newMods.map(mod => ({
        id: mod.id,
        name: mod.name,
        ...(mod.version && { version: mod.version })
      }));
    } else if (data.mod_list !== undefined) {
      data.mod_list = newMods.map(mod => ({
        id: mod.id,
        name: mod.name,
        ...(mod.version && { version: mod.version })
      }));
    } else if (data.enabled_mods !== undefined) {
      data.enabled_mods = newMods.map(mod => mod.id);
    } else {
      // 如果没有找到 MOD 字段，创建一个新的
      data.mods = newMods.map(mod => ({
        id: mod.id,
        name: mod.name,
        ...(mod.version && { version: mod.version })
      }));
    }
    
    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('Failed to update save file:', error);
    return fileContent;
  }
}

/**
 * 验证文件是否为有效的暗黑地牢存档文件
 */
export function isValidSaveFile(fileContent: string): boolean {
  try {
    const data = JSON.parse(fileContent);
    // 检查是否包含 MOD 相关字段
    return (
      data.mods !== undefined ||
      data.modlist !== undefined ||
      data.mod_list !== undefined ||
      data.enabled_mods !== undefined
    );
  } catch {
    return false;
  }
}
