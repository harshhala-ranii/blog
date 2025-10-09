import SlowLoading from '../../components/SlowLoading';

export default function ReviewsLoading() {
  return <SlowLoading message="Loading reviews..." minLoadingTime={300000} />;
}
