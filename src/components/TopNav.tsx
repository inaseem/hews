import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { paths } from '../routes/constants';
import QuickFilters from './QuickFilters';
import SearchField from './SearchField';
import { queryParamsMapping } from '../constants';
import BackButton from './BackButton';

const TopNav = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleTitleClick = () => {
    searchParams.delete(queryParamsMapping.query);
    searchParams.delete(queryParamsMapping.tags);
    searchParams.delete(queryParamsMapping.page);
    setSearchParams(searchParams);
  };

  const initialSearchValue = searchParams.get(queryParamsMapping.query) || '';

  const isHome = pathname === paths.root;
  return (
    <div className="z-20 px-4 py-4 md:px-0 md:py-6 flex flex-col gap-4 sticky top-0 left-0 bg-gray-100 dark:bg-gray-900">
      <div className="flex items-center justify-between gap-8">
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
          <SearchField
            key={initialSearchValue}
            initialValue={initialSearchValue}
          />
        )}
      </div>
      {isHome && (
        <div className="flex justify-end">
          <QuickFilters />
        </div>
      )}
    </div>
  );
};

export default TopNav;
