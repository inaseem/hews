import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { paths } from '../routes/constants';
import BackButton from './BackButton';
import QuickFilters from './QuickFilters';

const TopNav = () => {
  const { pathname } = useLocation();
  const [, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const handleBackClick = () => navigate(-1);

  const handleTitleClick = () => setSearchParams();

  const isHome = pathname === paths.root;
  return (
    <div className="px-4 py-4 md:px-0 md:py-6 flex flex-col gap-4 sticky top-0 left-0 bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-start md:flex-row justify-between gap-4 md:gap-8">
        <div className="flex gap-6 items-center">
          {!isHome && <BackButton onClick={handleBackClick} />}
          <h1
            className="font-bold uppercase tracking-widest text-lg sm:text-xl cursor-pointer"
            onClick={handleTitleClick}
          >
            HEWS
          </h1>
        </div>
        {isHome && (
          <div className="flex justify-end w-full">
            <QuickFilters />
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNav;
