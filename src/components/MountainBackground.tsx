import React from "react";

/**
 * MountainBackground - Full-page fixed background
 * Dark night sky at top (hero), snowy mountains at bottom (footer)
 * One seamless scene spanning the entire page
 */
export const MountainBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Sky gradient - dark navy to deep midnight blue */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              to bottom,
              #020a12 0%,
              #041018 8%,
              #051824 18%,
              #062030 30%,
              #082840 42%,
              #0a3050 54%,
              #0c3858 62%,
              #0e4060 68%,
              #124870 74%,
              #1a5878 78%,
              #226882 82%,
              #2a788e 86%,
              #327898 88%,
              #3a88a8 90%,
              #3a8ab0 92%,
              #3890b8 94%,
              #3494bc 95%,
              #2e98c0 96%,
              #28a0c8 97%,
              #22a8d0 98%,
              #1eb0d8 99%,
              #1ab8e0 100%
            )
          `,
        }}
      />

      {/* Stars in the upper sky */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Subtle stars */}
        {[
          [120, 60], [280, 45], [400, 80], [560, 35], [720, 55],
          [880, 42], [1040, 68], [1200, 50], [1360, 38], [60, 110],
          [200, 95], [340, 130], [500, 90], [660, 115], [820, 88],
          [980, 105], [1140, 78], [1300, 120], [1420, 95], [150, 160],
          [320, 175], [480, 145], [640, 190], [800, 155], [960, 170],
          [1120, 140], [1280, 180], [1400, 160], [90, 200], [250, 220],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={Math.random() > 0.7 ? 1.2 : 0.7}
            fill="white"
            opacity={0.3 + (i % 5) * 0.08}
          />
        ))}

        {/* Cyan aurora glow near horizon */}
        <ellipse
          cx="720"
          cy="680"
          rx="600"
          ry="120"
          fill="url(#auroraGlow)"
          opacity="0.25"
        />

        {/* Far distant mountains - lightest, most blue */}
        <path
          d="M-20 820 
             L80 720 L160 760 L240 690 L320 730 L400 670 L480 710 
             L560 660 L640 700 L720 645 L800 690 L880 650 L960 695
             L1040 660 L1120 700 L1200 675 L1280 710 L1360 690 
             L1440 720 L1460 820 Z"
          fill="url(#mountainFar)"
        />

        {/* Mid mountains - medium tone */}
        <path
          d="M-20 900 
             L0 820 L60 760 L120 800 L200 730 L280 775 L360 720
             L440 765 L520 700 L600 750 L680 710 L760 755 L840 715
             L920 760 L1000 725 L1080 770 L1160 740 L1240 780
             L1320 755 L1400 790 L1440 820 L1460 900 Z"
          fill="url(#mountainMid)"
        />

        {/* Close mountains - main silhouette */}
        <path
          d="M-20 980
             L0 900 L40 860 L100 820 L150 855 L200 800 
             L270 840 L330 790 L390 830 L450 795 L510 840
             L580 800 L640 845 L700 808 L760 850 L820 815
             L880 855 L940 820 L1000 862 L1060 828 L1120 865
             L1180 835 L1240 870 L1300 845 L1360 875 L1410 850
             L1440 870 L1460 980 Z"
          fill="url(#mountainClose)"
        />

        {/* Foreground snow base */}
        <path
          d="M-20 1000 L-20 960 
             L30 940 L80 955 L130 945 L180 958 L230 948 
             L280 960 L330 950 L380 965 L430 955 L480 968
             L530 958 L580 970 L630 960 L680 972 L730 963
             L780 975 L830 965 L880 978 L930 968 L980 980
             L1030 970 L1080 982 L1130 973 L1180 985 L1230 975
             L1280 988 L1330 978 L1380 990 L1430 982 L1460 990
             L1460 1000 Z"
          fill="url(#snowBase)"
        />

        {/* Snow highlights on mountain peaks */}
        <path
          d="M195 800 L210 815 L225 800 L220 808 L210 802 L200 808 Z"
          fill="white"
          opacity="0.6"
        />
        <path
          d="M455 795 L470 810 L485 795 L478 805 L468 798 L458 805 Z"
          fill="white"
          opacity="0.5"
        />
        <path
          d="M715 808 L730 822 L745 808 L738 818 L728 812 L718 818 Z"
          fill="white"
          opacity="0.55"
        />

        {/* Mist / fog at mountain base */}
        <rect x="-20" y="870" width="1480" height="130" fill="url(#mistGradient)" />

        {/* Cyan glow overlay at very bottom */}
        <rect x="-20" y="940" width="1480" height="60" fill="url(#cyanGlow)" opacity="0.3" />

        <defs>
          <linearGradient id="auroraGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0891b2" stopOpacity="0" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="mountainFar" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2a6e8a" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#3a8aaa" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="mountainMid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a4a62" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#1e5878" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="mountainClose" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0c2e42" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#0a2438" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="snowBase" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b0d8e8" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0a2438" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="mistGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3a8ab0" stopOpacity="0" />
            <stop offset="40%" stopColor="#2a7090" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0a2438" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="cyanGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0891b2" stopOpacity="0" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Subtle vignette on sides */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 100% at 50% 50%, transparent 60%, rgba(2,10,18,0.5) 100%)
          `,
        }}
      />
    </div>
  );
};

export default MountainBackground;
