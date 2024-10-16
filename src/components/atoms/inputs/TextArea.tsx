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
  onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
}

export const TextArea = forwardRef<HTMLDivElement, TextAreaProps>(
  ({ initialContent = [''], onChange, onKeyDown }, ref) => {
    const [content, setContent] = useState(() => {
      if (typeof initialContent === 'string') {
        return initialContent;
      }
      return Array.isArray(initialContent) ? initialContent.join('\n') : '';
    });

    const innerRef = useRef<HTMLDivElement | null>(null);

    const handleChange = () => {
      const newContent = innerRef.current?.innerText || '';
      setContent(newContent);
      onChange?.(newContent.split('\n'));
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      console.log('TextArea keydown:', event.key);
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        onKeyDown?.(event);
      } else if (event.key === 'Enter' && event.shiftKey) {
        // Allow Shift+Enter to create a new line
        document.execCommand('insertLineBreak');
        handleChange();
      } else {
        onKeyDown?.(event);
      }
    };

    useEffect(() => {
      if (innerRef.current) {
        innerRef.current.innerText = content;
      }
    }, []);

    return (
      <div
        ref={(el) => {
          innerRef.current = el;
          if (typeof ref === 'function') {
            ref(el);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
          }
        }}
        contentEditable
        suppressContentEditableWarning
        onInput={handleChange}
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
          '&:empty:before': {
            content: 'attr(data-placeholder)',
            color: 'text.secondary',
            opacity: 0.2,
          },
        })}
        data-placeholder="Press / or type a prompt here"
      />
    );
  }
);
