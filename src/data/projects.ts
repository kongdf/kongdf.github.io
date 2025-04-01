// Project data configuration file
// Used to manage data for the project display page

export interface Project {
	id: string;
	title: string;
	description: string;
	image: string;
	category: "web" | "mobile" | "desktop" | "other";
	techStack: string[];
	status: "completed" | "in-progress" | "planned";
	liveDemo?: string;
	sourceCode?: string;
	startDate: string;
	endDate?: string;
	featured?: boolean;
	tags?: string[];
	visitUrl?: string; // 添加前往项目链接字段
}

export const projectsData: Project[] = [
	{
		id: "blog",
		title: "博客",
		description: "基于Astro搭建的博客.",
		image: "",
		category: "web",
		techStack: ["Astro", "TypeScript", "Tailwind CSS", "Svelte"],
		status: "in-progress",
		liveDemo: "https://kongdf.com",
		// sourceCode: "https://github.com/example/mizuki", // 更改为GitHub链接
		visitUrl: "https://kongdf.com", // 添加前往项目链接
		startDate: "2026-01-24",
		endDate: "持续更新",
		featured: true,
		tags: ["Blog"],
	},
	{
		id: "box",
		title: "在线工具箱",
		description: "主要功能有自定义导航，图片压缩，word预览，excel预览，音视频转换等功能.",
		image: "",
		category: "web",
		techStack: ["Vue3", "Vite", "Nuxt", "FFMPEG"],
		status: "completed",
		liveDemo: "https://box.kongdf.com",
		visitUrl: "https://box.kongdf.com",
		startDate: "2024-09-01",
		endDate: "持续更新",
		featured: true,
		tags: ["Vue3", "Vite", "Nuxt"],
	},
	{
		id: "JDfund",
		title: "JDfund",
		description: "京东黄金积存金价格展示浮窗，告别手机盯盘",
		image: "",
		category: "desktop",
		techStack: ["React Native", "TypeScript", "Redux", "Firebase"],
		sourceCode: "https://github.com/kongdf/JDfund",
		status: "completed",
		startDate: "2024-03-01",
		tags: ["desktop", "Productivity", "Team Collaboration"],
	},

];

// Get project statistics
export const getProjectStats = () => {
	const total = projectsData.length;
	const completed = projectsData.filter(
		(p) => p.status === "completed",
	).length;
	const inProgress = projectsData.filter(
		(p) => p.status === "in-progress",
	).length;
	const planned = projectsData.filter((p) => p.status === "planned").length;

	return {
		total,
		byStatus: {
			completed,
			inProgress,
			planned,
		},
	};
};

// Get projects by category
export const getProjectsByCategory = (category?: string) => {
	if (!category || category === "all") {
		return projectsData;
	}
	return projectsData.filter((p) => p.category === category);
};

// Get featured projects
export const getFeaturedProjects = () => {
	return projectsData.filter((p) => p.featured);
};

// Get all tech stacks
export const getAllTechStack = () => {
	const techSet = new Set<string>();
	projectsData.forEach((project) => {
		project.techStack.forEach((tech) => {
			techSet.add(tech);
		});
	});
	return Array.from(techSet).sort();
};
