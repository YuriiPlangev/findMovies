import React from "react"
import ContentLoader from "react-content-loader"

const DetailsSkeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={1200}
    height={700}
    viewBox="0 0 1200 700"
    backgroundColor="#F5F5F5"
    opacity={0.36}
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="386" y="230" rx="8" ry="8" width="93" height="34" /> 
    <rect x="501" y="230" rx="8" ry="8" width="66" height="34" /> 
    <rect x="302" y="230" rx="8" ry="8" width="65" height="34" /> 
    <rect x="303" y="290" rx="8" ry="8" width="880" height="82" /> 
    <rect x="303" y="449" rx="8" ry="8" width="302" height="28" /> 
    <rect x="303" y="490" rx="8" ry="8" width="260" height="28" /> 
    <rect x="303" y="530" rx="8" ry="8" width="379" height="28" /> 
    <rect x="303" y="573" rx="8" ry="8" width="387" height="28" /> 
    <rect x="303" y="410" rx="8" ry="8" width="186" height="28" /> 
    <rect x="0" y="230" rx="0" ry="0" width="270" height="429" /> 
    <rect x="0" y="0" rx="0" ry="0" width="1200" height="170" />
  </ContentLoader>
)

export default DetailsSkeleton