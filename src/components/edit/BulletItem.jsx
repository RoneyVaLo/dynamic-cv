const BulletItem = ({ children }) => {
  return (
    <div className="flex items-start mb-0.5">
      <span className="w-3 mr-2">•</span>
      <span className="flex-1 text-md">{children}</span>
    </div>
  );
};

export default BulletItem;
