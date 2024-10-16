import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import {
  FontPreloadLinks,
  FontStyleDeclaration,
} from '@/components/fonts/fonts';
import { css } from '../../styled-system/css';
import { FlowProvider } from '@/contexts/FlowContext';
import { InputProvider } from '@/contexts/InputContext';
import { PromptSectionProvider } from '@/contexts/PromptSectionContext';
import { EditorProvider } from '@/contexts/EditorContext';
import { OutputProvider } from '@/contexts/OutputContext';
import { FlowSectionProvider } from '@/contexts/FlowSectionContext';
import { ProjectProvider } from '@/contexts/ProjectContext';
import { InstructionProvider } from '@/contexts/InstructionContext';
import { SectionChangeProvider } from '@/contexts/SectionChangeContext';
import { ConfirmationModal } from '@/components/molecules/modals';
import { ConfirmationModalProvider } from '@/contexts/ConfirmationModalContext';

export const metadata: Metadata = {
  title: 'Wordware App',
  description: 'A design for Wordware',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <FontPreloadLinks />
      </head>
      <body
        className={css({
          bg: 'scheme1.background',
          color: 'text.primary',
          fontFamily: 'body',
          display: 'flex',
          flexDirection: 'column',
          h: '100vh',
          w: '100vw',
          padding: '40px 40px 0px 40px',
          overflow: 'hidden',
        })}
      >
        <FontStyleDeclaration />
        <ConfirmationModalProvider>
          <ProjectProvider>
            <EditorProvider>
              <SectionChangeProvider>
                <FlowProvider>
                  <OutputProvider>
                    <InstructionProvider>
                      <FlowSectionProvider>
                        <InputProvider>
                          <PromptSectionProvider>
                            {children}
                          </PromptSectionProvider>
                        </InputProvider>
                      </FlowSectionProvider>
                    </InstructionProvider>
                  </OutputProvider>
                </FlowProvider>
              </SectionChangeProvider>
            </EditorProvider>
          </ProjectProvider>
        </ConfirmationModalProvider>
      </body>
    </html>
  );
}
