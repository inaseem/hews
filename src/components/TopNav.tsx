import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { paths } from '../routes/constants';
import BackButton from './BackButton';

const TopNav = () => {
  const { pathname } = useLocation();
  const [, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const handleBackClick = () => navigate(-1);

  const handleTitleClick = () => setSearchParams();

  const isHome = pathname === paths.root;
  return (
    <div className="px-3 py-1 md:px-0 md:py-4 sticky top-0 left-0 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-center relative">
        <div>
          {!isHome && <BackButton onClick={handleBackClick} />}
        </div>
        <h1
          className="font-bold uppercase tracking-widest text-base md:text-lg cursor-pointer"
          onClick={handleTitleClick}
        >
          HEWS
        </h1>
      </div>
    </div>
  );
};

export default TopNav;
