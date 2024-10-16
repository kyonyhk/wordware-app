import { css } from '../../../styled-system/css';
import { PrimaryButton } from '../atoms/buttons/PrimaryButton';
import { Play, Upload } from '../atoms/icons';
import { ProjectName } from '../molecules/ProjectName';

interface ProjectHeaderProps {
  isPublic: boolean;
}

export function ProjectHeader({ isPublic }: ProjectHeaderProps) {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'row',
        gap: '16px',
        w: '100%',
        position: 'relative',
        left: 'auto',
        right: 'auto',
      })}
    >
      <div className={css({ flex: 1 })}>
        <ProjectName isPublic={isPublic} />
      </div>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'row',
          gap: '8px',
        })}
      >
        <PrimaryButton
          leftIcon={<Upload width={20} height={20} color="text.primary" />}
        >
          PUBLISH
        </PrimaryButton>
        <PrimaryButton
          leftIcon={<Play width={20} height={20} color="text.primary" />}
        >
          RUN
        </PrimaryButton>
      </div>
    </div>
  );
}
