import skeletonStyles from './PlayerSkeleton.module.css';

const summaryLines = [1, 2, 3, 4, 5, 6];

export default function PlayerLoading() {
  return (
    <div className={skeletonStyles.shell} aria-label="Loading audio player">
      <div className={skeletonStyles.sidebar}>
        <div className={skeletonStyles.logo} />
      </div>

      <main className={skeletonStyles.main}>
        <header className={skeletonStyles.topbar}>
          <div className={skeletonStyles.search}>
            <span className={skeletonStyles.searchIcon} />
          </div>
        </header>

        <div className={skeletonStyles.content}>
          <section className={skeletonStyles.summarySection}>
            <div className={`${skeletonStyles.skeleton} ${skeletonStyles.summaryTitle}`} />
            <div className={skeletonStyles.summaryTextStack}>
              {summaryLines.map((item) => (
                <div
                  className={`${skeletonStyles.skeleton} ${
                    item === summaryLines.length
                      ? skeletonStyles.summaryLineShort
                      : skeletonStyles.summaryLine
                  }`}
                  key={item}
                />
              ))}
            </div>
          </section>
        </div>

        <section className={skeletonStyles.player} aria-label="Loading audiobook controls">
          <div className={skeletonStyles.coverPanel}>
            <div className={`${skeletonStyles.skeleton} ${skeletonStyles.cover}`} />
          </div>

          <div className={skeletonStyles.playerContent}>
            <div className={`${skeletonStyles.skeleton} ${skeletonStyles.eyebrow}`} />
            <div className={`${skeletonStyles.skeleton} ${skeletonStyles.playerTitle}`} />
            <div className={`${skeletonStyles.skeleton} ${skeletonStyles.author}`} />

            <div className={skeletonStyles.timelineWrap}>
              <div className={`${skeletonStyles.skeleton} ${skeletonStyles.timeline}`} />
              <div className={skeletonStyles.timeRow}>
                <div className={`${skeletonStyles.skeleton} ${skeletonStyles.time}`} />
                <div className={`${skeletonStyles.skeleton} ${skeletonStyles.time}`} />
              </div>
            </div>

            <div className={skeletonStyles.controls}>
              <div className={`${skeletonStyles.skeleton} ${skeletonStyles.iconButton}`} />
              <div className={`${skeletonStyles.skeleton} ${skeletonStyles.playButton}`} />
              <div className={`${skeletonStyles.skeleton} ${skeletonStyles.iconButton}`} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
