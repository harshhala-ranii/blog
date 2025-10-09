import SlowLoading from '../../../components/SlowLoading';

export default function BlogLoading() {
  return <SlowLoading message="Loading thoughts..." minLoadingTime={70000} />;
}
