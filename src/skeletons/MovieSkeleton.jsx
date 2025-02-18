import ContentLoader from "react-content-loader"

const MovieSkeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={200}
    height={350}
    viewBox="0 0 200 350"
    backgroundColor="#F5F5F5"
    opacity={0.36}
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="413" y="214" rx="3" ry="3" width="178" height="6" /> 
    <rect x="-3" y="0" rx="8" ry="8" width="170" height="320" /> 
    <rect x="10" y="328" rx="8" ry="8" width="150" height="15" />
  </ContentLoader>
)

export default MovieSkeleton
