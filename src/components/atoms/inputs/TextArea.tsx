import React, {
  useState,
  KeyboardEvent,
  useRef,
  useEffect,
  forwardRef,
  ForwardedRef,
} from 'react';
import { css } from '../../../../styled-system/css';

interface TextAreaProps {
  initialContent?: string | string[];
  onChange?: (content: string[]) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ initialContent = [''], onChange, onKeyDown }, ref) => {
    const [content, setContent] = useState(() => {
      if (typeof initialContent === 'string') {
        return initialContent;
      }
      return Array.isArray(initialContent) ? initialContent.join('\n') : '';
    });

    const innerRef = useRef<HTMLTextAreaElement | null>(null);

    const handleChange = () => {
      const newContent = innerRef.current?.value || '';
      setContent(newContent);
      onChange?.(newContent.split('\n'));
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        onKeyDown?.(event);
      } else if (event.key === 'Enter' && event.shiftKey) {
        // Allow Shift+Enter to create a new line
        return;
      } else {
        onKeyDown?.(event);
      }
    };

    useEffect(() => {
      if (innerRef.current) {
        innerRef.current.value = content;
      }
    }, []);

    return (
      <textarea
        ref={(el) => {
          innerRef.current = el;
          if (typeof ref === 'function') {
            ref(el);
          } else if (ref) {
            ref.current = el;
          }
        }}
        value={content}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={css({
          w: '100%',
          h: 'auto',
          padding: '8px 0px',
          color: 'text.primary',
          opacity: 0.8,
          textStyle: 'body4',
          overflow: 'hidden',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          outline: 'none',
          cursor: 'text !important',
          border: 'none',
          resize: 'none',
          background: 'transparent',
          '&::placeholder': {
            color: 'text.secondary',
            opacity: 0.2,
          },
        })}
        placeholder="Press / or type a prompt here"
      />
    );
  }
);

TextArea.displayName = 'TextArea';
