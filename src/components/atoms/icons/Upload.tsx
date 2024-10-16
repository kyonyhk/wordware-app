import React from 'react';
import { css } from '../../../../styled-system/css';
import { useIcon } from '../../../hooks/useIcon';

interface UploadProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

export const Upload: React.FC<UploadProps> = ({ className, ...props }) => {
  const { width, height, viewBox, scaleFactor, iconStyles } = useIcon(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      className={`${iconStyles} ${className || ''}`}
    >
      <g transform={`scale(${scaleFactor})`}>
        <path
          opacity="0.2"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.33346 1.41076V3.20008C9.33346 3.94682 9.33346 4.32019 9.47878 4.6054C9.60661 4.85628 9.81059 5.06026 10.0615 5.18809C10.3467 5.33341 10.7201 5.33341 11.4668 5.33341H13.2558C13.3334 5.69939 13.3334 6.10578 13.3334 6.87585V9.33337C13.3334 11.2002 13.3334 12.1336 12.9701 12.8467C12.6505 13.4739 12.1406 13.9838 11.5134 14.3034C10.8003 14.6667 9.86692 14.6667 8.00008 14.6667C6.13324 14.6667 5.19982 14.6667 4.48678 14.3034C3.85957 13.9838 3.34964 13.4739 3.03006 12.8467C2.66675 12.1336 2.66675 11.2002 2.66675 9.33337V6.51882C2.66675 4.79135 2.66675 3.92762 2.97914 3.25779C3.31032 2.54769 3.88106 1.97695 4.59117 1.64577C5.26099 1.33337 6.12473 1.33337 7.8522 1.33337C8.60178 1.33337 8.97919 1.33337 9.33346 1.41076Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.83342 1.84835C8.60734 1.83434 8.31045 1.83338 7.8522 1.83338C6.98084 1.83338 6.35516 1.83372 5.86282 1.871C5.3757 1.9079 5.05995 1.97885 4.8025 2.09892C4.19892 2.38042 3.71379 2.86555 3.43228 3.46914C3.31222 3.72658 3.24126 4.04234 3.20437 4.52946C3.16708 5.02179 3.16675 5.64747 3.16675 6.51883V9.33338C3.16675 10.2751 3.16714 10.9512 3.2105 11.482C3.25339 12.0069 3.33581 12.3454 3.47556 12.6197C3.7472 13.1528 4.18065 13.5863 4.71378 13.8579C4.98806 13.9977 5.32655 14.0801 5.85147 14.123C6.38223 14.1663 7.05841 14.1667 8.00008 14.1667C8.94175 14.1667 9.61794 14.1663 10.1487 14.123C10.6736 14.0801 11.0121 13.9977 11.2864 13.8579C11.8195 13.5863 12.253 13.1528 12.5246 12.6197C12.6644 12.3454 12.7468 12.0069 12.7897 11.482C12.833 10.9512 12.8334 10.2751 12.8334 9.33338V6.87586C12.8334 6.39234 12.8323 6.0752 12.8171 5.8334H11.4667H11.4465C11.0904 5.83341 10.7931 5.83342 10.5503 5.81358C10.297 5.79288 10.0593 5.74814 9.83443 5.63358C9.48947 5.45781 9.209 5.17735 9.03324 4.83238C8.91867 4.60754 8.87393 4.36977 8.85324 4.11652C8.8334 3.8737 8.83341 3.57648 8.83341 3.2204V3.22039V3.22036L8.83342 3.20007V1.84835ZM12.5601 4.8334C12.5169 4.74222 12.4688 4.65329 12.4159 4.56702C12.2479 4.29282 12.0111 4.05151 11.4178 3.45817L11.1653 3.20572C10.616 2.65641 10.3926 2.43696 10.1416 2.27706C10.0424 2.21381 9.93941 2.15693 9.83342 2.10666V3.20007C9.83342 3.58169 9.8338 3.83783 9.84992 4.03508C9.86556 4.2265 9.89348 4.31802 9.92424 4.37839C10.0041 4.5352 10.1316 4.66268 10.2884 4.74257C10.3488 4.77334 10.4403 4.80126 10.6317 4.8169C10.829 4.83301 11.0851 4.8334 11.4667 4.8334H12.5601ZM9.44917 0.924274C9.03869 0.833258 8.60989 0.833304 7.91333 0.833378L7.8522 0.833383H7.83152C6.98529 0.83338 6.32182 0.833378 5.7873 0.87386C5.24324 0.915066 4.79221 1.00031 4.37983 1.19264C3.56321 1.57349 2.90686 2.22985 2.526 3.04646C2.33367 3.45885 2.24843 3.90987 2.20723 4.45394C2.16674 4.98845 2.16675 5.65192 2.16675 6.49815V6.51883V9.33338V9.35576C2.16674 10.2702 2.16674 10.9872 2.21382 11.5634C2.26176 12.1502 2.361 12.6349 2.58456 13.0737C2.95207 13.795 3.5385 14.3814 4.25979 14.7489C4.69854 14.9725 5.18328 15.0717 5.77004 15.1196C6.34627 15.1667 7.06323 15.1667 7.97771 15.1667H7.97775H8.00008H8.02241H8.02245C8.93693 15.1667 9.65389 15.1667 10.2301 15.1196C10.8169 15.0717 11.3016 14.9725 11.7404 14.7489C12.4617 14.3814 13.0481 13.795 13.4156 13.0737C13.6392 12.6349 13.7384 12.1502 13.7863 11.5634C13.8334 10.9872 13.8334 10.2703 13.8334 9.35581V9.35577V9.33338V6.87586L13.8334 6.80985C13.8335 6.05754 13.8336 5.59433 13.7275 5.15255C13.6336 4.76142 13.4787 4.38749 13.2685 4.04452C13.0312 3.65714 12.7036 3.32965 12.1716 2.79776L12.1716 2.79774L12.1249 2.75107L11.8724 2.49861L11.8292 2.45538C11.3367 1.96279 11.0335 1.65955 10.6789 1.43365C10.3018 1.19344 9.88565 1.02105 9.44917 0.924274ZM7.64653 6.97983C7.84179 6.78457 8.15837 6.78457 8.35364 6.97983L10.0203 8.6465C10.2156 8.84176 10.2156 9.15834 10.0203 9.3536C9.82504 9.54887 9.50846 9.54887 9.31319 9.3536L8.50008 8.54049V11.3334C8.50008 11.6095 8.27622 11.8334 8.00008 11.8334C7.72394 11.8334 7.50008 11.6095 7.50008 11.3334V8.54049L6.68697 9.3536C6.49171 9.54887 6.17512 9.54887 5.97986 9.3536C5.7846 9.15834 5.7846 8.84176 5.97986 8.6465L7.64653 6.97983Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};