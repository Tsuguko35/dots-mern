export default function hasSidebar(location, routes) {
    const excludedPaths = [
        '/login',
        '/registration',
      ];
    
    return routes.some(route => {
    const isExcluded = excludedPaths.includes(route.path);
    let pathname = location.pathname
    if(pathname.endsWith('/')){
        pathname = pathname.slice(0, -1)
    }
    
    if (route.path === '/opcr/form-overview/:formID') {
        return pathname.startsWith(route.path.split('/:')[0]) && (/^\/opcr\/form-overview\/[a-zA-Z0-9]+$/.test(pathname));
    } else {
        return !isExcluded && route.path === pathname;
    }
    });
}