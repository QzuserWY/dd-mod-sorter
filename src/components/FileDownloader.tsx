import { useState } from 'react';
import { ModInfo } from '../utils/saveFileParser';

interface FileDownloaderProps {
  fileName: string;
  mods: ModInfo[];
  updatedContent: string;
  onReset: () => void;
  onBackToSort: () => void;
}

export default function FileDownloader({
  fileName,
  mods,
  updatedContent,
  onReset,
  onBackToSort,
}: FileDownloaderProps) {
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([updatedContent], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(updatedContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="w-full">
      {/* 成功提示 */}
      <div className="mb-6 p-4 bg-green-900 bg-opacity-30 border border-green-600 rounded-lg">
        <div className="flex items-center gap-3">
          <svg
            className="w-6 h-6 text-green-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="text-green-300 font-semibold">MOD 排序已更新</p>
            <p className="text-green-200 text-sm">
              您的 MOD 列表已按照新的顺序排列。现在可以下载更新后的存档文件。
            </p>
          </div>
        </div>
      </div>

      {/* 排序摘要 */}
      <div className="mb-6 p-4 bg-gray-700 bg-opacity-50 rounded-lg">
        <h3 className="font-semibold text-white mb-3">MOD 排序摘要</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {mods.map((mod, index) => (
            <div key={mod.id} className="flex items-center gap-3 text-sm">
              <span className="text-gray-400 font-mono w-8">#{index + 1}</span>
              <span className="text-white flex-1 truncate">{mod.name}</span>
              {mod.version && (
                <span className="text-gray-400 text-xs">v{mod.version}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 下载选项 */}
      <div className="mb-6 space-y-3">
        <h3 className="font-semibold text-white">下载选项</h3>
        
        <button
          onClick={handleDownload}
          className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          下载修改后的存档文件
        </button>

        <button
          onClick={handleCopyToClipboard}
          className={`w-full px-6 py-3 font-semibold rounded-lg transition-all ${
            copied
              ? 'bg-green-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {copied ? '✓ 已复制到剪贴板' : '复制 JSON 内容'}
        </button>
      </div>

      {/* 使用说明 */}
      <div className="mb-6 p-4 bg-blue-900 bg-opacity-30 border border-blue-600 rounded-lg">
        <h4 className="font-semibold text-blue-300 mb-2">如何使用下载的文件？</h4>
        <ol className="text-blue-200 text-sm space-y-1 list-decimal list-inside">
          <li>备份您原始的 persist.game.json 文件</li>
          <li>将下载的文件重命名为 persist.game.json</li>
          <li>将其放回游戏存档目录（覆盖原文件）</li>
          <li>启动游戏，新的 MOD 加载顺序将被应用</li>
        </ol>
      </div>

      {/* 警告信息 */}
      <div className="mb-6 p-4 bg-yellow-900 bg-opacity-30 border border-yellow-600 rounded-lg">
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="text-yellow-300 font-semibold">重要提示</p>
            <p className="text-yellow-200 text-sm">
              请在修改前备份您的原始存档文件。不当的修改可能导致存档损坏。
            </p>
          </div>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex gap-4">
        <button
          onClick={onBackToSort}
          className="flex-1 px-6 py-3 bg-gray-700 text-gray-300 font-semibold rounded-lg hover:bg-gray-600 transition-all"
        >
          返回排序
        </button>
        <button
          onClick={onReset}
          className="flex-1 px-6 py-3 bg-gray-700 text-gray-300 font-semibold rounded-lg hover:bg-gray-600 transition-all"
        >
          重新开始
        </button>
      </div>
    </div>
  );
}
