interface ITruncateTextProps {
  className?: string;
  text?: string;
  onClick?: () => void;
}

const TruncateText: React.FC<ITruncateTextProps> = ({
  className,
  text = "",
  onClick,
}) => {
  const maxLength = 30;
  const truncatedText =
    text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  return (
    <p className={className} onClick={onClick}>
      {truncatedText}
    </p>
  );
};

export { TruncateText };
