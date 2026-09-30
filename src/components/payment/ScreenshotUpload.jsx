import { useId, useRef, useState } from 'react';
import { ImagePlus, RefreshCw, Trash2, UploadCloud } from 'lucide-react';
import { SCREENSHOT_RULES } from '../../data/paymentData';
import { compressImageToDataUrl, formatFileSize } from '../../utils/image';

/**
 * Drag-and-drop / click-to-choose screenshot picker.
 * `value` is { dataUrl, name, size } | null; `onChange` receives the same shape (or null).
 */
export function ScreenshotUpload({ value, onChange, error, onError }) {
  const inputId = useId();
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      onError('Please upload an image (PNG, JPG or WEBP). PDFs and other files are not accepted.');
      return;
    }
    if (file.size > SCREENSHOT_RULES.maxBytes) {
      onError(`That image is ${formatFileSize(file.size)}. Please upload one under ${formatFileSize(SCREENSHOT_RULES.maxBytes)}.`);
      return;
    }

    setProcessing(true);
    try {
      const dataUrl = await compressImageToDataUrl(file);
      onError('');
      onChange({ dataUrl, name: file.name, size: file.size });
    } catch {
      onError("We couldn't read that image. Please try a PNG or JPG screenshot.");
    } finally {
      setProcessing(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const onDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    handleFile(event.dataTransfer.files?.[0]);
  };

  return (
    <div>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(event) => handleFile(event.target.files?.[0])}
        aria-describedby={error ? `${inputId}-error` : undefined}
      />

      {value ? (
        <div className="flex items-start gap-3 rounded-[7px] border border-line bg-paper-light p-2.5 max-mobile:flex-col">
          <img className="h-[120px] w-[90px] flex-none rounded-[5px] border border-line bg-white object-cover object-top max-mobile:h-[160px] max-mobile:w-full max-mobile:object-contain" src={value.dataUrl} alt="Uploaded payment screenshot preview" />
          <div className="grid min-w-0 flex-1 gap-1 self-center">
            <strong className="truncate text-[9px]">{value.name}</strong>
            <span className="text-[8px] text-muted">{formatFileSize(value.size)} · ready to submit</span>
            <div className="mt-1.5 flex gap-1.5">
              <label htmlFor={inputId} className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-line px-2.5 py-1.5 text-[8px] font-bold hover:bg-[#f5f5f3]">
                <RefreshCw size={10} /> Replace
              </label>
              <button
                type="button"
                onClick={() => { onChange(null); onError(''); }}
                className="inline-flex items-center gap-1 rounded-full border border-line px-2.5 py-1.5 text-[8px] font-bold hover:bg-[#f5f5f3]"
              >
                <Trash2 size={10} /> Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`grid cursor-pointer place-items-center gap-1.5 rounded-[7px] border border-dashed px-4 py-7 text-center transition-colors duration-200 focus-within:border-navy ${
            dragging ? 'border-navy bg-paper-soft' : error ? 'border-[#c4574a] bg-[#fdf6f5]' : 'border-faint/50 bg-paper-light hover:border-muted'
          }`}
        >
          <span className="grid size-9 place-items-center rounded-full border border-line bg-white text-muted">
            {processing ? <RefreshCw size={15} className="animate-spin" /> : <UploadCloud size={16} />}
          </span>
          <strong className="text-[9px]">{processing ? 'Preparing your screenshot…' : 'Click to upload or drag & drop'}</strong>
          <span className="inline-flex items-center gap-1 text-[8px] text-muted">
            <ImagePlus size={10} /> {SCREENSHOT_RULES.label}
          </span>
        </label>
      )}

      {error && (
        <p id={`${inputId}-error`} role="alert" className="mb-0 mt-2 text-[8px] font-medium text-[#b3382b]">
          {error}
        </p>
      )}
    </div>
  );
}
