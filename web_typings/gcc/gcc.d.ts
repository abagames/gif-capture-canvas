declare module 'gcc' {
	function capture(element: any);
	function captureSvg(svgElm: any);
	function end(): HTMLImageElement;
	function setOptions(_options: Options);

	export let options: Options;

	interface Options {
		scale?: number;
		durationSec?: number;
		keyCode?: number;
		capturingFps?: number;
		appFps?: number;
		isAppendingImgElement?: boolean;
		quality?: number;
		downloadFileName?: string;
	}
}
