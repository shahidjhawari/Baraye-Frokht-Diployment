import React from 'react';
import logo from "../assest/assest/gifcompresslogo.gif"

const Logo = ({ w, h }) => {
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 370.16679528778167 155.08501865265873"
      className="css-1j8o68f"
    >
      <defs id="SvgjsDefs1029"></defs>
      <g
        id="SvgjsG1030"
        featurekey="symbolFeature-0"
        transform="matrix(1.0366270169158764,0,0,1.0366270169158764,-1.4512779225426833,25.1808949373991)"
        fill="#292929"
      >
        {/* Your existing SVG paths */}
      </g>
      <image
        href={logo} // Replace "url_to_your_image_logo.png" with the URL of your image logo
        width="320" // Adjust width and height according to your image logo dimensions
      />
      <g
        id="SvgjsG1031"
        featurekey="nameFeature-0"
        transform="matrix(3.1490010125155847,0,0,3.1490010125155847,117.1067759560417,-33.25345501665937)"
        fill="#292929"
      >
        {/* Your existing SVG paths */}
      </g>
      <g
        id="SvgjsG1032"
        featurekey="sloganFeature-0"
        transform="matrix(2.0663600877799073,0,0,2.0663600877799073,119.70852494513755,103.66737189459191)"
        fill="#292929"
      >
        {/* Your existing SVG paths */}
      </g>
    </svg>
  );
};

export default Logo;
