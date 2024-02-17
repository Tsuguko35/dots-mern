export default function hasNavbar(location, routes) {
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
    
    if (route.path === '/Requests/:requestType') {
        return pathname.startsWith(route.path.split('/:')[0]) && (/^\/Requests\/[a-zA-Z0-9]+$/.test(pathname));
    } 
    else if (route.path === '/Monitoring/:monitoringType') {
        return pathname.startsWith(route.path.split('/:')[0]) && (/^\/Monitoring\/[a-zA-Z0-9]+$/.test(pathname));
    } 
    else {
        return !isExcluded && route.path === pathname;
    }
    });
}