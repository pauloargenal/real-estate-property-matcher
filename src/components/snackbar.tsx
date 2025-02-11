interface SnackbarProps {
  message: string;
  type: 'success' | 'error';
}

export default function Snackbar(props: SnackbarProps) {
  const { message, type } = props;
  let containerClassName = '';

  if (type === 'success') {
    containerClassName = ' bg-blue-80';
  }

  if (type === 'error') {
    containerClassName = ' bg-cienna-100';
  }

  return (
    <div
      className={`py-3 px-6 flex items-center rounded-lg shadow-[0_20px_48px_-10px_rgba(231,136,84,0.5)] ${containerClassName}`}
      data-testid="snackbar"
    >
      <p className="text-white">{message}</p>
    </div>
  );
}
