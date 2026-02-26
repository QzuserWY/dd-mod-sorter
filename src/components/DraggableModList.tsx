import { useState } from 'react';
import { ModInfo } from '../utils/saveFileParser';

interface DraggableModListProps {
  mods: ModInfo[];
  onModsUpdate: (mods: ModInfo[]) => void;
  allMods: ModInfo[];
}

export default function DraggableModList({
  mods,
  onModsUpdate,
  allMods,
}: DraggableModListProps) {
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [dragOverItem, setDragOverItem] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (index: number) => {
    setDragOverItem(index);
  };

  const handleDragLeave = () => {
    setDragOverItem(null);
  };

  const handleDrop = (dropIndex: number) => {
    if (draggedItem === null) return;

    // 获取实际的 MOD 对象
    const draggedMod = mods[draggedItem];
    const dropMod = mods[dropIndex];

    // 在全部 MOD 列表中找到它们的索引
    const draggedIndexInAll = allMods.findIndex(m => m.id === draggedMod.id);
    const dropIndexInAll = allMods.findIndex(m => m.id === dropMod.id);

    // 创建新的 MOD 列表
    const newMods = [...allMods];
    const [movedMod] = newMods.splice(draggedIndexInAll, 1);
    newMods.splice(dropIndexInAll, 0, movedMod);

    onModsUpdate(newMods);
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;

    const draggedMod = mods[index];
    const draggedIndexInAll = allMods.findIndex(m => m.id === draggedMod.id);

    if (draggedIndexInAll === 0) return;

    const newMods = [...allMods];
    [newMods[draggedIndexInAll - 1], newMods[draggedIndexInAll]] = [
      newMods[draggedIndexInAll],
      newMods[draggedIndexInAll - 1],
    ];

    onModsUpdate(newMods);
  };

  const handleMoveDown = (index: number) => {
    if (index === mods.length - 1) return;

    const draggedMod = mods[index];
    const draggedIndexInAll = allMods.findIndex(m => m.id === draggedMod.id);

    if (draggedIndexInAll === allMods.length - 1) return;

    const newMods = [...allMods];
    [newMods[draggedIndexInAll], newMods[draggedIndexInAll + 1]] = [
      newMods[draggedIndexInAll + 1],
      newMods[draggedIndexInAll],
    ];

    onModsUpdate(newMods);
  };

  if (mods.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        没有找到匹配的 MOD
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-96 overflow-y-auto">
      {mods.map((mod, index) => (
        <div
          key={mod.id}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={() => handleDragOver(index)}
          onDragLeave={handleDragLeave}
          onDrop={() => handleDrop(index)}
          className={`p-4 bg-gray-700 rounded-lg cursor-move transition-all border-2 ${
            draggedItem === index
              ? 'opacity-50 border-red-500'
              : dragOverItem === index
              ? 'border-red-500 bg-gray-600'
              : 'border-gray-600 hover:border-gray-500'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-mono text-sm">
                  #{allMods.findIndex(m => m.id === mod.id) + 1}
                </span>
                <div>
                  <p className="text-white font-medium truncate">{mod.name}</p>
                  <p className="text-gray-400 text-sm truncate">{mod.id}</p>
                  {mod.version && (
                    <p className="text-gray-500 text-xs">v{mod.version}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-2 ml-4">
              <button
                onClick={() => handleMoveUp(index)}
                disabled={allMods.findIndex(m => m.id === mod.id) === 0}
                className="p-2 bg-gray-600 text-gray-300 rounded hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                title="向上移动"
              >
                ↑
              </button>
              <button
                onClick={() => handleMoveDown(index)}
                disabled={allMods.findIndex(m => m.id === mod.id) === allMods.length - 1}
                className="p-2 bg-gray-600 text-gray-300 rounded hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                title="向下移动"
              >
                ↓
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
