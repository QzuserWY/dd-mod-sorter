import { useState } from 'react';
import FileUploader from './components/FileUploader';
import ModSorter from './components/ModSorter';
import FileDownloader from './components/FileDownloader';
import { ModInfo, extractModsFromSaveFile, updateModsInSaveFile } from './utils/saveFileParser';

function App() {
  const [mods, setMods] = useState<ModInfo[]>([]);
  const [originalContent, setOriginalContent] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [step, setStep] = useState<'upload' | 'sort' | 'download'>('upload');

  const handleFileUpload = (file: File, content: string) => {
    const extractedMods = extractModsFromSaveFile(content);
    setMods(extractedMods);
    setOriginalContent(content);
    setFileName(file.name);
    setStep('sort');
  };

  const handleModsUpdate = (updatedMods: ModInfo[]) => {
    setMods(updatedMods);
  };

  const handleProceedToDownload = () => {
    setStep('download');
  };

  const handleResetToUpload = () => {
    setMods([]);
    setOriginalContent('');
    setFileName('');
    setStep('upload');
  };

  const getUpdatedFileContent = (): string => {
    return updateModsInSaveFile(originalContent, mods);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-2">
            暗黑地牢 MOD 排序工具
          </h1>
          <p className="text-gray-400">
            读取、自定义排序并覆盖游戏存档中的 MOD 加载顺序
          </p>
        </div>

        {/* 步骤指示器 */}
        <div className="flex justify-center gap-4 mb-12">
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              step === 'upload'
                ? 'bg-red-600 text-white'
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            <span className="text-lg">1</span>
            <span>上传存档</span>
          </div>
          <div className="text-gray-500">→</div>
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              step === 'sort'
                ? 'bg-red-600 text-white'
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            <span className="text-lg">2</span>
            <span>排序 MOD</span>
          </div>
          <div className="text-gray-500">→</div>
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              step === 'download'
                ? 'bg-red-600 text-white'
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            <span className="text-lg">3</span>
            <span>下载文件</span>
          </div>
        </div>

        {/* 主内容区域 */}
        <div className="bg-gray-800 rounded-lg shadow-2xl p-8">
          {step === 'upload' && (
            <FileUploader onFileUpload={handleFileUpload} />
          )}

          {step === 'sort' && (
            <ModSorter
              mods={mods}
              fileName={fileName}
              onModsUpdate={handleModsUpdate}
              onProceedToDownload={handleProceedToDownload}
              onReset={handleResetToUpload}
            />
          )}

          {step === 'download' && (
            <FileDownloader
              fileName={fileName}
              mods={mods}
              updatedContent={getUpdatedFileContent()}
              onReset={handleResetToUpload}
              onBackToSort={() => setStep('sort')}
            />
          )}
        </div>

        {/* 页脚 */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>
            此工具仅用于个人使用。请确保在修改前备份您的存档文件。
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
