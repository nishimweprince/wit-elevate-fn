import React, { useState } from 'react';
import { Bold, Italic, Link as LinkIcon, Image, List, ListOrdered, Code } from 'lucide-react';

interface PostEditorProps {
  placeholder?: string;
  buttonText?: string;
  initialContent?: string;
  onSubmit: (content: string) => void;
  onCancel?: () => void;
}

const PostEditor: React.FC<PostEditorProps> = ({ 
  placeholder = 'Write your post here...', 
  buttonText = 'Post',
  initialContent = '',
  onSubmit,
  onCancel
}) => {
  const [content, setContent] = useState(initialContent);
  const [isPreview, setIsPreview] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content);
      setContent('');
    }
  };

  const insertFormatting = (format: string) => {
    const textArea = document.getElementById('post-editor') as HTMLTextAreaElement;
    if (!textArea) return;

    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let formattedText = '';
    let cursorPosition = 0;
    
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        cursorPosition = selectedText ? end + 4 : start + 2;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        cursorPosition = selectedText ? end + 2 : start + 1;
        break;
      case 'link':
        formattedText = `[${selectedText}](url)`;
        cursorPosition = selectedText ? end + 6 : start + 1;
        break;
      case 'image':
        formattedText = `![${selectedText}](url)`;
        cursorPosition = selectedText ? end + 7 : start + 2;
        break;
      case 'ul':
        formattedText = `\n- ${selectedText}`;
        cursorPosition = selectedText ? end + 3 : start + 3;
        break;
      case 'ol':
        formattedText = `\n1. ${selectedText}`;
        cursorPosition = selectedText ? end + 4 : start + 4;
        break;
      case 'code':
        formattedText = `\`${selectedText}\``;
        cursorPosition = selectedText ? end + 2 : start + 1;
        break;
      default:
        return;
    }
    
    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
    
    // Set cursor position after update
    setTimeout(() => {
      textArea.focus();
      textArea.setSelectionRange(cursorPosition, cursorPosition);
    }, 0);
  };

  const handleFileUpload = () => {
    setIsUploading(true);
    // Simulating file upload
    setTimeout(() => {
      const imageUrl = 'example-image.jpg';
      const textArea = document.getElementById('post-editor') as HTMLTextAreaElement;
      if (!textArea) return;
      
      const cursorPos = textArea.selectionStart;
      const textBefore = content.substring(0, cursorPos);
      const textAfter = content.substring(cursorPos);
      
      const newContent = `${textBefore}\n![Image](${imageUrl})\n${textAfter}`;
      setContent(newContent);
      setIsUploading(false);
    }, 1000);
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="bg-gray-50 p-2 border-b border-gray-300 flex flex-wrap items-center gap-1">
        <button 
          type="button" 
          className="p-1 text-gray-600 hover:bg-gray-200 rounded" 
          title="Bold"
          onClick={() => insertFormatting('bold')}
        >
          <Bold className="h-5 w-5" />
        </button>
        <button 
          type="button" 
          className="p-1 text-gray-600 hover:bg-gray-200 rounded" 
          title="Italic"
          onClick={() => insertFormatting('italic')}
        >
          <Italic className="h-5 w-5" />
        </button>
        <button 
          type="button" 
          className="p-1 text-gray-600 hover:bg-gray-200 rounded" 
          title="Link"
          onClick={() => insertFormatting('link')}
        >
          <LinkIcon className="h-5 w-5" />
        </button>
        <button 
          type="button" 
          className="p-1 text-gray-600 hover:bg-gray-200 rounded" 
          title="Image"
          onClick={handleFileUpload}
        >
          <Image className="h-5 w-5" />
          {isUploading && <span className="ml-1 text-xs">Uploading...</span>}
        </button>
        <button 
          type="button" 
          className="p-1 text-gray-600 hover:bg-gray-200 rounded" 
          title="Bullet List"
          onClick={() => insertFormatting('ul')}
        >
          <List className="h-5 w-5" />
        </button>
        <button 
          type="button" 
          className="p-1 text-gray-600 hover:bg-gray-200 rounded" 
          title="Numbered List"
          onClick={() => insertFormatting('ol')}
        >
          <ListOrdered className="h-5 w-5" />
        </button>
        <button 
          type="button" 
          className="p-1 text-gray-600 hover:bg-gray-200 rounded" 
          title="Code"
          onClick={() => insertFormatting('code')}
        >
          <Code className="h-5 w-5" />
        </button>
        
        <div className="ml-auto flex items-center">
          <button
            type="button"
            className={`px-3 py-1 text-sm rounded ${isPreview ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
            onClick={() => setIsPreview(false)}
          >
            Write
          </button>
          <button
            type="button"
            className={`px-3 py-1 text-sm rounded ${!isPreview ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
            onClick={() => setIsPreview(true)}
          >
            Preview
          </button>
        </div>
      </div>
      
      {!isPreview ? (
        <textarea
          id="post-editor"
          className="w-full p-3 h-40 focus:outline-none resize-y"
          placeholder={placeholder}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      ) : (
        <div className="w-full p-3 h-40 overflow-y-auto prose">
          {content || <div className="text-gray-400">Nothing to preview</div>}
        </div>
      )}
      
      <div className="bg-gray-50 p-3 border-t border-gray-300 flex justify-between">
        <div className="flex items-center">
          <button
            type="button"
            className="px-4 py-2 text-sm bg-gray-800 text-white rounded-md hover:bg-gray-700"
            onClick={handleFileUpload}
          >
            Attach Files
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          {onCancel && (
            <button
              type="button"
              className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
          <button
            type="button"
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            onClick={handleSubmit}
            disabled={!content.trim()}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostEditor;
