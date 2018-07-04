export declare let options: Options;
export declare function capture(element: any): void;
export declare function captureSvg(svgElm: any): void;
export declare function end(): HTMLImageElement;
export declare function setOptions(_options: Options): void;
export interface Options {
    scale?: number;
    durationSec?: number;
    keyCode?: number;
    capturingFps?: number;
    appFps?: number;
    isAppendingImgElement?: boolean;
    quality?: number;
    downloadFileName?: string;
}
