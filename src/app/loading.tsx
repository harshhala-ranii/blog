import SlowLoading from '../components/SlowLoading';

export default function HomeLoading() {
  return <SlowLoading message="Loading truth..." minLoadingTime={3000} />;
}
