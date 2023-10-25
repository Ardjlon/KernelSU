import{_ as s,o as a,c as l,O as e}from"./chunks/framework.43781440.js";const u=JSON.parse('{"title":"Как собрать KernelSU?","description":"","frontmatter":{},"headers":[],"relativePath":"ru_RU/guide/how-to-build.md","filePath":"ru_RU/guide/how-to-build.md"}'),n={name:"ru_RU/guide/how-to-build.md"},o=e(`<h1 id="как-собрать-kernelsu" tabindex="-1">Как собрать KernelSU? <a class="header-anchor" href="#как-собрать-kernelsu" aria-label="Permalink to &quot;Как собрать KernelSU?&quot;">​</a></h1><p>Прежде всего, необходимо ознакомиться с официальной документацией Android по сборке ядра:</p><ol><li><a href="https://source.android.com/docs/setup/build/building-kernels" target="_blank" rel="noreferrer">Сборка ядер</a></li><li><a href="https://source.android.com/docs/core/architecture/kernel/gki-release-builds" target="_blank" rel="noreferrer">Сборки релизов GKI</a></li></ol><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>Эта страница предназначена для устройств GKI, если вы используете старое ядро, пожалуйста, обратитесь к <a href="./how-to-integrate-for-non-gki.html">Как интегрировать KernelSU для не GKI ядер?</a>.</p></div><h2 id="сборка-ядра" tabindex="-1">Сборка ядра <a class="header-anchor" href="#сборка-ядра" aria-label="Permalink to &quot;Сборка ядра&quot;">​</a></h2><h3 id="синхронизация-исходного-кода-ядра" tabindex="-1">Синхронизация исходного кода ядра <a class="header-anchor" href="#синхронизация-исходного-кода-ядра" aria-label="Permalink to &quot;Синхронизация исходного кода ядра&quot;">​</a></h3><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">repo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">init</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-u</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://android.googlesource.com/kernel/manifest</span></span>
<span class="line"><span style="color:#FFCB6B;">mv</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#C3E88D;">kernel_manifest.xm</span><span style="color:#A6ACCD;">l</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">.repo/manifests</span></span>
<span class="line"><span style="color:#FFCB6B;">repo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">init</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">manifest.xml</span></span>
<span class="line"><span style="color:#FFCB6B;">repo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">sync</span></span></code></pre></div><p>Файл <code>&lt;kernel_manifest.xml&gt;</code> - это файл манифеста, который может однозначно определять сборку, с его помощью можно выполнить пересборку. Файл манифеста следует загрузить с сайта <a href="https://source.android.com/docs/core/architecture/kernel/gki-release-builds" target="_blank" rel="noreferrer">Сборки релизов Google GKI</a></p><h3 id="построение" tabindex="-1">Построение <a class="header-anchor" href="#построение" aria-label="Permalink to &quot;Построение&quot;">​</a></h3><p>Пожалуйста, сначала ознакомьтесь с <a href="https://source.android.com/docs/setup/build/building-kernels" target="_blank" rel="noreferrer">официальной документацией</a>.</p><p>Например, нам необходимо собрать образ ядра aarch64:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">LTO</span><span style="color:#89DDFF;">=</span><span style="color:#C3E88D;">thin</span><span style="color:#A6ACCD;"> BUILD_CONFIG</span><span style="color:#89DDFF;">=</span><span style="color:#C3E88D;">common/build.config.gki.aarch64</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">build/build.sh</span></span></code></pre></div><p>Не забудьте добавить флаг <code>LTO=thin</code>, иначе сборка может завершиться неудачей, если память вашего компьютера меньше 24 Гб.</p><p>Начиная с Android 13, сборка ядра осуществляется с помощью <code>bazel</code>:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">tools/bazel</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">build</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--config=fast</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">//common:kernel_aarch64_dist</span></span></code></pre></div><h2 id="сборка-ядра-с-помощью-kernelsu" tabindex="-1">Сборка ядра с помощью KernelSU <a class="header-anchor" href="#сборка-ядра-с-помощью-kernelsu" aria-label="Permalink to &quot;Сборка ядра с помощью KernelSU&quot;">​</a></h2><p>Если вы успешно собрали ядро, то собрать KernelSU очень просто, выберите любой запуск в корневом каталоге исходного кода ядра:</p><ul><li>Последний тэг(стабильный)</li></ul><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-LSs</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">https://raw.githubusercontent.com/tiann/KernelSU/main/kernel/setup.sh</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-</span></span></code></pre></div><ul><li>Основная ветвь(разработка)</li></ul><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-LSs</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">https://raw.githubusercontent.com/tiann/KernelSU/main/kernel/setup.sh</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-s</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">main</span></span></code></pre></div><ul><li>Выбранный тэг(Например, версия v0.5.2)</li></ul><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-LSs</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">https://raw.githubusercontent.com/tiann/KernelSU/main/kernel/setup.sh</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-s</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">v0.5.2</span></span></code></pre></div><p>А затем пересоберите ядро и получите образ ядра с KernelSU!</p>`,24),p=[o];function t(r,c,i,C,d,h){return a(),l("div",null,p)}const D=s(n,[["render",t]]);export{u as __pageData,D as default};
