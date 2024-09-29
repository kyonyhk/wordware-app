'use client';

export const FontPreloadLinks = () => {
  return (
    <>
      <link
        rel="preload"
        href="/fonts/PPNeueMontreal-Regular.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/PPNikkeiPacific-Regular.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
    </>
  );
};

export const FontStyleDeclaration = () => {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
					@font-face {
						font-family: 'PP Neue Montreal';
						src: url('/fonts/PPNeueMontreal-Regular.woff2') format('woff2');
						font-weight: 400;
						font-style: normal;
					}
					@font-face {
						font-family: 'PP Nikkei Pacific';
						src: url('/fonts/PPNikkeiPacific-Regular.woff2') format('woff2');
						font-weight: 400;
						font-style: normal;
					}
	
					:root {
						--font-pp-neue-montreal-regular: 'PP Neue Montreal';
						--font-pp-nikkei-pacific-regular: 'PP Nikkei Pacific';
					}
				`,
      }}
    />
  );
};
