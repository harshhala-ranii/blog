import SlowLoading from '../../components/SlowLoading';

export default function BlogsLoading() {
  return <SlowLoading message="Loading stories..." minLoadingTime={20000} />;
}
