// 设备数据配置文件

export interface Device {
	name: string;
	image: string;
	specs: string;
	description: string;
	link: string;
}

// 设备类别类型，支持品牌和自定义类别
export type DeviceCategory = {
	[categoryName: string]: Device[];
} & {
	自定义?: Device[];
};

export const devicesData: DeviceCategory = {
	电脑: [
		{
			name: "MacBook Pro 14",
			image: "https://www.apple.com.cn/v/mac/compare/af/images/overview/compare_macbook_pro_14_silver__vhx3tykmuluu_large_2x.jpg",
			specs: "Apple M2 Pro",
			description: "开发主力机",
			link: "https://www.gl-inet.cn/products/gl-mt3000/",
		}, {
			name: "ROG 魔霸新锐",
			image: "https://dlcdnwebimgs.asus.com.cn/gain/E17607E8-B0AA-41B4-AFE2-8F30F0899C3E/w1000/h732",
			specs: "Ultra 7 255 HX + RTX5060",
			description: "日常+开发",
			link: "https://rog.asus.com.cn/laptops/rog-strix/rog-strix-g16-2025-g614/",
		},
	],
	手机: [
		{
			name: "iPhone 15 Pro",
			image: "https://www.apple.com.cn/v/iphone/compare/ak/images/overview/compare_iphone15_pro_white_titanium__cziovz7g406e_small_2x.jpg",
			specs: "iOS:26.2",
			description: "主力机",
			link: "https://www.apple.com.cn/iphone/",
		}, {
			name: "iPhone 11",
			image: "https://www.apple.com.cn/v/iphone/compare/ak/images/overview/compare_iphone11_white__cm312zcjamxe_small_2x.jpg",
			specs: "iOS:16.7.2",
			description: "iOS测试机",
			link: "https://www.apple.com.cn/iphone/",
		}, {
			name: "红米Note 11",
			image: "https://2b.zol-img.com.cn/product/221_1200x900/861/ceuUE41ZIfFeo.jpg",
			specs: "iOS:16.7.2",
			description: "Android测试机",
			link: "https://www.oneplus.com/cn/13t",
		},
	],
	相机: [
		{
			name: "尼康Z6 III",
			image: "https://2d.zol-img.com.cn/product/264/939/ceDlpl807zUN.jpg",
			specs: "全画幅 2450万像素",
			description: "日常扫街用",
			link: "https://www.nikon.com.cn/sc_CN/product/mirrorless/z6iii",
		},
		{
			name: "24-120mm f/4 S",
			image: "https://2e.zol-img.com.cn/product/223/724/ceYGOWFxt8EMk.jpg",
			specs: "尼康Z口变焦镜头",
			description: "日常扫街用",
			link: "https://www.nikon.com.cn/sc_CN/product/nikkor-lenses/z-mount/zoom/telephoto-zoom/z-24-120mm-f-4-s",
		},

	], 游戏机: [
		{
			name: "Switch（OLED版）",
			image: "https://2a.zol-img.com.cn/product/221/244/cekZJGXb4nRYk.jpg",
			specs: "日版白色 + Pro手柄",
			description: "塞尔达和哈迪斯太好玩了",
			link: "https://www.nintendo.com/",
		},
	],
};
