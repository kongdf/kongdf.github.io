<script lang="ts">
	// 1. 定义TS接口，强类型约束返回数据（适配接口返回结构，可根据实际res调整）
	interface GameItem {
		id: number;
		gameName: string;
		[key: string]: any; // 兼容其他未知字段
	}
	interface UserData {
		money: number;
		gameCount: number;
		[key: string]: any; // 兼容其他未知字段
	}

	$: gameList = [];

	$: userData = null;

	// 新增加载状态，用于页面骨架屏/加载提示（用户体验优化）
	let isLoading = true;

	// 3. 封装请求函数，增加错误捕获、加载状态管理
	async function getGameData() {
		try {
			isLoading = true;
			// 并行请求（两个接口无依赖，并行可提升加载速度，原串行改为Promise.all）
			const [res1, res2] = await Promise.all([
				fetch(
					"https://switch.jumpvg.com/jump/mine/ownlist?limit=18&moduleId=1&nsGame=1&offset=0&type=0&userId=5189458&version=3",
				),
				fetch(
					"https://switch.jumpvg.com/jump/mine/owngameandmoney?type=1&userId=5189458&version=3",
				),
			]);

			// 校验请求是否成功（HTTP状态码非2xx时抛出错误）
			if (!res1.ok || !res2.ok) throw new Error("接口请求失败");

			// 并行解析JSON，提升效率
			const [res1Obj, res2Obj] = await Promise.all([
				res1.json(),
				res2.json(),
			]);

			// 赋值并确保数据类型正确
			gameList = res1Obj.data || [];
			userData = res2Obj.data || null;
			console.log("游戏列表数据：", gameList);
		} catch (error) {
			// 错误处理，避免页面白屏
			console.error("数据加载失败：", error);
			gameList = [];
			userData = null;
			// 可选：给用户展示错误提示
			// alert("数据加载失败，请稍后重试");
		} finally {
			// 无论成功/失败，结束加载状态
			isLoading = false;
		}
	}

	// 4. 修复响应式过滤变量：原立即执行函数会导致仅初始化执行，失去响应式
	// 直接响应式关联，gameList更新则filterGames自动更新

	// 5. 优化生命周期与动画：Svelte推荐使用元素绑定，替代原生querySelector
	import { onMount } from "svelte";
	// 定义元素绑定变量，关联页面中的.game-card容器
	let gameCards: HTMLElement[] = [];

	onMount(() => {
		// 初始化请求（放在onMount更符合Svelte组件生命周期，避免服务端渲染问题）
		getGameData();
	});
</script>

<h2
	class="text-lg p-6 font-bold text-black/90 dark:text-white/90 group-hover:text-[var(--primary)] transition-colors duration-300"
>
	共{userData?.gameCount}款游戏 · 总游玩{userData?.totalPlayTime}
</h2>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
	{#if gameList.length === 0}
		<div class="col-span-full py-16 text-center text-slate-400">
			暂无匹配的游戏数据
		</div>
	{:else}
		{#each gameList as game, index}
			<div
				class="  rounded-xl border border-[var(--line-divider)] bg-[var(--card-bg)] transition-all duration-300 hover:border-[var(--primary)]/50 hover:shadow-md hover:shadow-black/5 dark:hover:shadow-white/5 hover:scale-[1.02] hover:-translate-y-0.5"
			>
				<div class="relative p-6 pb-0">
					<div
						class="flex justify-center items-center h-48 bg-gradient-to-br from-[var(--card-bg)] to-[var(--btn-regular-bg)] rounded-lg overflow-hidden relative"
					>
						<div
							class="absolute inset-0 bg-[var(--primary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
						></div>
						<img
							src={game.icon}
							alt={game.name}
							class="w-auto h-full max-h-full object-contain group-hover:scale-110 transition-all duration-500 drop-shadow-md relative z-10"
						/>
					</div>
				</div>
				<div class="p-6 pt-4 relative z-10">
					<div class="flex items-start justify-between mb-3">
						<h3
							class="text-lg font-bold text-black/90 dark:text-white/90 group-hover:text-[var(--primary)] transition-colors duration-300"
						>
							{game.name}
						</h3>
					</div>

					<div
						class="inline-flex items-center px-3 rounded-full bg-[var(--btn-regular-bg)] text-black/70 dark:text-white/70 text-sm mb-1"
					>
						<span class="text-sm">⏰</span>
						<span class="font-medium"
							>游玩时间：{game.totalPlayHour}h
						</span>
					</div>

					<div
						class="inline-flex items-center px-3 rounded-full bg-[var(--btn-regular-bg)] text-black/70 dark:text-white/70 text-sm mb-1"
					>
						<span class="text-sm">🤗</span>
						<span class="font-medium"> {game.lastTime} </span>
					</div>
				</div>
			</div>
		{/each}
	{/if}
</div>

<!-- 完全复用你指定的样式 + 少量适配调整 -->
<style>
	:root {
		--radius-large: 1rem;
		--line-divider: #e2e8f0;
		--card-bg: #ffffff;
		--btn-regular-bg: #f1f5f9;
		--btn-content: #334155;
		--primary: #0ea5e9;
		--color-primary-rgb: 14, 165, 233;
	}

	.filter-container {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	.filter-tag {
		padding: 0.625rem 1.25rem;
		border: 1px solid var(--line-divider);
		border-radius: var(--radius-large);
		background: var(--btn-regular-bg);
		color: var(--btn-content);
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		white-space: nowrap;
		position: relative;
		overflow: hidden;
	}

	.filter-tag::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: var(--primary);
		opacity: 0;
		transition: opacity 0.3s ease;
		z-index: -1;
	}

	.filter-tag:hover:not(.active) {
		background: var(--btn-hover-bg, #e2e8f0);
		border-color: var(--primary);
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.filter-tag.active {
		background: var(--primary);
		color: white;
		border-color: var(--primary);
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(var(--color-primary-rgb), 0.3);
	}

	.filter-tag.active:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 16px rgba(var(--color-primary-rgb), 0.4);
	}

	/* 游戏卡片入场动画效果（完全复用你的keyframes） */
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.onload-animation {
		animation: fadeInUp 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
		opacity: 0;
	}

	/* 文本截断（复用你的样式） */
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* 游戏卡片微妙的悬停效果（完全复用你的after样式） */
	.game-card::after {
		content: "";
		position: absolute;
		inset: 0;
		border-radius: 0.75rem;
		background: linear-gradient(
			135deg,
			rgba(var(--color-primary-rgb), 0.05),
			transparent
		);
		opacity: 0;
		transition: opacity 0.4s ease;
		pointer-events: none;
	}

	.game-card:hover::after {
		opacity: 1;
	}

	/* 游戏名称文本样式（复用你的样式） */
	.game-card h3 {
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	}

	/* 响应式调整（完全复用你的适配逻辑，适配移动端） */
	@media (max-width: 640px) {
		.filter-container {
			gap: 0.5rem;
		}

		.filter-tag {
			padding: 0.5rem 1rem;
			font-size: 0.8rem;
		}

		.game-card .relative.p-6.pb-0 {
			padding: 1rem 1rem 0;
		}

		.game-card .p-6.pt-4 {
			padding: 1rem;
		}

		.card-base {
			px: 1rem !important;
			py: 1.5rem !important;
		}
	}

	/* 深色模式适配（复用你的样式） */
	@media (prefers-color-scheme: dark) {
		:root {
			--line-divider: #334155;
			--card-bg: #1e293b;
			--btn-regular-bg: #334155;
			--btn-content: #e2e8f0;
		}
		.game-card {
			background: var(--card-bg);
			color: white;
		}
		.game-card h3 {
			color: white;
		}
		.game-card .bg-gradient-to-br {
			background: linear-gradient(
				to bottom right,
				var(--card-bg),
				#2a3647
			) !important;
		}
		.game-card:hover {
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		}
		.text-slate-600 {
			color: #cbd5e1 !important;
		}
		.text-slate-500 {
			color: #94a3b8 !important;
		}
	}
</style>
