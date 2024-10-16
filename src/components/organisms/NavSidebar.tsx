'use client';

import { css } from '../../../styled-system/css';
import { useState } from 'react';
import { NoBorderButton, IconButton } from '../atoms/buttons';
import {
  Play,
  Folder,
  Upload,
  Sidebar,
  Documentation,
  Help,
  Explore,
} from '../atoms/icons';

const EXPANDED_WIDTH = '160px';
const COLLAPSED_WIDTH = '32px';

export function NavSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeButton, setActiveButton] = useState('FLOWS');

  const containerStyles = css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '24px',
    padding: '16px 8px',
    borderRadius: '8px',
    marginBottom: '40px',
    bg: 'scheme1.secondaryContainer',
    width: isCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
    transition: 'width 1.0s cubic-bezier(0.16, 1, 0.3, 1)',
    overflow: 'hidden',
  });

  const titleStyles = css({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: isCollapsed ? '0%' : '100%',
    opacity: isCollapsed ? 0 : 1,
    transition: 'width 1.0s cubic-bezier(0.16, 1, 0.3, 1)',
    textStyle: 'heading6',
  });

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
    // Add any navigation logic here if needed
  };

  return (
    <div className={containerStyles}>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        })}
      >
        <div
          className={css({
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            w: '100%',
          })}
        >
          <div className={titleStyles}>WORDWARE</div>
          <IconButton
            icon={<Sidebar width={16} height={16} color="text.primary" />}
            onClick={() => setIsCollapsed((prev) => !prev)}
          />
        </div>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          })}
        >
          <NoBorderButton
            icon={<Folder width={16} height={16} color="text.primary" />}
            isActive={activeButton === 'FLOWS'}
            onClick={() => handleButtonClick('FLOWS')}
            isCollapsed={isCollapsed}
          >
            FLOWS
          </NoBorderButton>
          <NoBorderButton
            icon={<Play width={16} height={16} color="text.primary" />}
            isActive={activeButton === 'RUNS'}
            onClick={() => handleButtonClick('RUNS')}
            isCollapsed={isCollapsed}
          >
            RUNS
          </NoBorderButton>
          <NoBorderButton
            icon={<Upload width={16} height={16} color="text.primary" />}
            isActive={activeButton === 'DEPLOYMENTS'}
            onClick={() => handleButtonClick('DEPLOYMENTS')}
            isCollapsed={isCollapsed}
          >
            DEPLOYMENTS
          </NoBorderButton>
        </div>
      </div>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        })}
      >
        <NoBorderButton
          icon={<Explore width={16} height={16} color="text.primary" />}
          isActive={activeButton === 'EXPLORE'}
          onClick={() => handleButtonClick('EXPLORE')}
          isCollapsed={isCollapsed}
        >
          EXPLORE
        </NoBorderButton>
        <NoBorderButton
          icon={<Help width={16} height={16} color="text.primary" />}
          isActive={activeButton === 'FEEDBACK'}
          onClick={() => handleButtonClick('FEEDBACK')}
          isCollapsed={isCollapsed}
        >
          FEEDBACK
        </NoBorderButton>
        <NoBorderButton
          icon={<Documentation width={16} height={16} color="text.primary" />}
          isActive={activeButton === 'DOCUMENTATION'}
          onClick={() => handleButtonClick('DOCUMENTATION')}
          isCollapsed={isCollapsed}
        >
          DOCUMENTATION
        </NoBorderButton>
      </div>
    </div>
  );
}
