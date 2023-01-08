export const appRoutes = {
    pitch: '/pitch', // AuthGuardRoute
    onboarding: '/onboarding', // AuthGuardRoute
    passwordReset: '/passwordReset', // AuthGuardRoute

    any: '*', // Public

    forgotPassword: '/forgot-password', // UnAuthGuardRoute
    home: '/', // UnAuthGuardRoute
    login: '/login', // UnAuthGuardRoute
    resetPassword: '/reset-password', // UnAuthGuardRoute
}