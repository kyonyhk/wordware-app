import React from 'react';
import { css } from '../../../../styled-system/css';
import { useIcon } from '../../../hooks/useIcon';

interface FolderProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

export const Folder: React.FC<FolderProps> = ({ className, ...props }) => {
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
          d="M1.3335 4.53337C1.3335 3.41327 1.3335 2.85322 1.55148 2.42539C1.74323 2.04907 2.04919 1.74311 2.42552 1.55136C2.85334 1.33337 3.41339 1.33337 4.5335 1.33337H5.54464C6.07906 1.33337 6.34627 1.33337 6.58752 1.39435C6.98621 1.49512 7.34414 1.71633 7.61257 2.02787C7.775 2.21638 7.8945 2.45538 8.1335 2.93337C8.29283 3.25204 8.37249 3.41137 8.48078 3.53705C8.65973 3.74473 8.89836 3.89221 9.16415 3.95939C9.32498 4.00004 9.50312 4.00004 9.8594 4.00004H10.4002C11.8936 4.00004 12.6404 4.00004 13.2108 4.29069C13.7126 4.54635 14.1205 4.9543 14.3762 5.45607C14.6668 6.0265 14.6668 6.77323 14.6668 8.26671V10.4C14.6668 11.8935 14.6668 12.6403 14.3762 13.2107C14.1205 13.7124 13.7126 14.1204 13.2108 14.3761C12.6404 14.6667 11.8936 14.6667 10.4002 14.6667H5.60016C4.10669 14.6667 3.35995 14.6667 2.78952 14.3761C2.28776 14.1204 1.87981 13.7124 1.62415 13.2107C1.3335 12.6403 1.3335 11.8935 1.3335 10.4V4.53337Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.46499 1.87901C6.29846 1.83692 6.10572 1.83328 5.54464 1.83328H4.5335C3.96519 1.83328 3.56904 1.83367 3.26062 1.85887C2.95803 1.88359 2.78419 1.92967 2.65251 1.99677C2.37027 2.14058 2.1408 2.37005 1.99699 2.65229C1.92989 2.78397 1.88381 2.95781 1.85908 3.2604C1.83389 3.56882 1.8335 3.96497 1.8335 4.53327V10.3999C1.8335 11.1549 1.83389 11.6911 1.86817 12.1107C1.90197 12.5244 1.96622 12.7806 2.06965 12.9836C2.27737 13.3913 2.60883 13.7227 3.01652 13.9305C3.2195 14.0339 3.47567 14.0981 3.88942 14.1319C4.309 14.1662 4.84517 14.1666 5.60016 14.1666H10.4002C11.1551 14.1666 11.6913 14.1662 12.1109 14.1319C12.5247 14.0981 12.7808 14.0339 12.9838 13.9305C13.3915 13.7227 13.7229 13.3913 13.9307 12.9836C14.0341 12.7806 14.0984 12.5244 14.1322 12.1107C14.1664 11.6911 14.1668 11.1549 14.1668 10.3999V8.26661C14.1668 7.51162 14.1664 6.97545 14.1322 6.55587C14.0984 6.14211 14.0341 5.88595 13.9307 5.68296C13.7229 5.27528 13.3915 4.94382 12.9838 4.7361C12.7808 4.63267 12.5247 4.56842 12.1109 4.53461C11.6913 4.50033 11.1551 4.49994 10.4002 4.49994H9.8594C9.84122 4.49994 9.82327 4.49995 9.80555 4.49997C9.50197 4.50015 9.26418 4.5003 9.04163 4.44405C8.67616 4.35168 8.34806 4.1489 8.102 3.86332C7.95215 3.68942 7.84594 3.47667 7.71034 3.20505C7.70243 3.1892 7.69441 3.17314 7.68628 3.15688C7.43536 2.65504 7.34591 2.48428 7.23378 2.35415C7.03246 2.1205 6.76401 1.95459 6.46499 1.87901ZM5.60824 0.833264C6.08128 0.833119 6.40745 0.833018 6.71004 0.909498C7.2084 1.03546 7.65582 1.31198 7.99135 1.70139C8.19508 1.93783 8.34086 2.22961 8.55228 2.65278C8.56162 2.67148 8.5711 2.69044 8.58071 2.70967C8.75196 3.05218 8.80158 3.14328 8.85957 3.21057C8.97141 3.34038 9.12055 3.43255 9.28667 3.47454C9.37279 3.4963 9.47646 3.49994 9.8594 3.49994H10.4002H10.4222C11.1503 3.49994 11.7273 3.49994 12.1923 3.53794C12.6679 3.57679 13.0703 3.65786 13.4378 3.84509C14.0336 4.14869 14.5181 4.63313 14.8217 5.22897C15.0089 5.59642 15.09 5.99884 15.1288 6.47443C15.1668 6.93951 15.1668 7.51651 15.1668 8.2446V8.26661V10.3999V10.422C15.1668 11.15 15.1668 11.727 15.1288 12.1921C15.09 12.6677 15.0089 13.0701 14.8217 13.4376C14.5181 14.0334 14.0336 14.5179 13.4378 14.8215C13.0703 15.0087 12.6679 15.0898 12.1923 15.1286C11.7273 15.1666 11.1503 15.1666 10.4222 15.1666H10.4002H5.60016H5.57815C4.85006 15.1666 4.27306 15.1666 3.80798 15.1286C3.33239 15.0898 2.92998 15.0087 2.56253 14.8215C1.96668 14.5179 1.48224 14.0334 1.17864 13.4376C0.991417 13.0701 0.910346 12.6677 0.871488 12.1921C0.833489 11.727 0.833492 11.15 0.833496 10.4219L0.833496 10.3999V4.53327L0.833496 4.51187C0.833491 3.96998 0.833487 3.5329 0.862405 3.17896C0.89218 2.81454 0.955086 2.49445 1.10598 2.1983C1.34566 1.7279 1.72811 1.34544 2.19852 1.10576C2.49467 0.954867 2.81476 0.891961 3.17918 0.862186C3.53312 0.833268 3.9702 0.833272 4.51209 0.833277L4.5335 0.833277H5.54464C5.56614 0.833277 5.58733 0.833271 5.60824 0.833264Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};