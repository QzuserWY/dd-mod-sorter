import { useState } from 'react';
import { ModInfo } from '../utils/saveFileParser';
import DraggableModList from './DraggableModList';

interface ModSorterProps {
  mods: ModInfo[];
  fileName: string;
  onModsUpdate: (mods: ModInfo[]) => void;
  onProceedToDownload: () => void;
  onReset: () => void;
}

export default function ModSorter({
  mods,
  fileName,
  onModsUpdate,
  onProceedToDownload,
  onReset,
}: ModSorterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredMods = mods.filter(mod =>
    mod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mod.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSort = (order: 'asc' | 'desc') => {
    setSortOrder(order);
    const sorted = [...mods].sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return order === 'asc' ? comparison : -comparison;
    });
    onModsUpdate(sorted);
  };

  const handleReset = () => {
    // 重置为原始顺序
    onReset();
  };

  return (
    <div className="w-full">
      {/* 文件信息 */}
      <div className="mb-6 p-4 bg-gray-700 bg-opacity-50 rounded-lg">
        <p className="text-gray-300">
          <span className="font-semibold">当前文件:</span> {fileName}
        </p>
        <p className="text-gray-300">
          <span className="font-semibold">MOD 数量:</span> {mods.length}
        </p>
      </div>

      {/* 搜索和排序工具栏 */}
      <div className="mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            搜索 MOD
          </label>
          <input
            type="text"
            placeholder="输入 MOD 名称或 ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => handleSort('asc')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
              sortOrder === 'asc'
                ? 'bg-red-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            ↑ 按名称升序
          </button>
          <button
            onClick={() => handleSort('desc')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
              sortOrder === 'desc'
                ? 'bg-red-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            ↓ 按名称降序
          </button>
        </div>
      </div>

      {/* MOD 列表 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          MOD 列表 ({filteredMods.length}/{mods.length})
        </h3>
        <DraggableModList
          mods={filteredMods}
          onModsUpdate={onModsUpdate}
          allMods={mods}
        />
      </div>

      {/* 操作按钮 */}
      <div className="flex gap-4">
        <button
          onClick={handleReset}
          className="flex-1 px-6 py-3 bg-gray-700 text-gray-300 font-semibold rounded-lg hover:bg-gray-600 transition-all"
        >
          重新上传
        </button>
        <button
          onClick={onProceedToDownload}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-lg hover:from-red-700 hover:to-orange-700 transition-all"
        >
          继续下载
        </button>
      </div>
    </div>
  );
}
