import SlowLoading from '../../../components/SlowLoading';

export default function ReviewLoading() {
  return <SlowLoading message="Loading review..." minLoadingTime={60000} />;
}
