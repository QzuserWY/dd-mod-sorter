import { useRef, useState } from 'react';
import { isValidSaveFile } from '../utils/saveFileParser';

interface FileUploaderProps {
  onFileUpload: (file: File, content: string) => void;
}

export default function FileUploader({ onFileUpload }: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = async (file: File) => {
    setError('');

    // 验证文件类型
    if (!file.name.endsWith('.json')) {
      setError('请选择 JSON 文件（persist.game.json）');
      return;
    }

    try {
      const content = await file.text();
      
      // 验证文件内容
      if (!isValidSaveFile(content)) {
        setError('文件不是有效的暗黑地牢存档文件。请确保选择了 persist.game.json 文件。');
        return;
      }

      onFileUpload(file, content);
    } catch (err) {
      setError('读取文件失败，请重试。');
      console.error(err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
          isDragging
            ? 'border-red-500 bg-red-500 bg-opacity-10'
            : 'border-gray-600 hover:border-gray-500'
        }`}
      >
        <div className="mb-4">
          <svg
            className="w-16 h-16 mx-auto text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>

        <h3 className="text-xl font-semibold text-white mb-2">
          上传存档文件
        </h3>
        <p className="text-gray-400 mb-4">
          拖拽 persist.game.json 文件到此处，或点击选择
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleInputChange}
          className="hidden"
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="inline-block px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-lg hover:from-red-700 hover:to-orange-700 transition-all"
        >
          选择文件
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-900 bg-opacity-30 border border-red-600 rounded-lg text-red-300">
          {error}
        </div>
      )}

      <div className="mt-8 p-4 bg-gray-700 bg-opacity-50 rounded-lg">
        <h4 className="font-semibold text-white mb-2">如何找到存档文件？</h4>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>
            <strong>Windows:</strong> %APPDATA%\LocalLow\Red Hook Studios\Darkest Dungeon\profile_1\persist.game.json
          </li>
          <li>
            <strong>macOS:</strong> ~/Library/Application Support/Darkest Dungeon/profile_1/persist.game.json
          </li>
          <li>
            <strong>Linux:</strong> ~/.config/unity3d/Red Hook Studios/Darkest Dungeon/profile_1/persist.game.json
          </li>
        </ul>
      </div>
    </div>
  );
}
