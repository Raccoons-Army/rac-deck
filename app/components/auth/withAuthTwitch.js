export function withAuthTwitch(gssp) {
    return async (context) => {

        // if it doesnt has twitch access token on a cookie
        if (!context.req.cookies.twitchAcessTokenInfo) {
            return {
                redirect: {
                    destination: '/connections'
                }
            };
        }

        const gsspData = await gssp(context); // Run `getServerSideProps` to get page-specific data

        // Pass page-specific props along with user data from `withAuth` to component
        return {
            props: {
                ...gsspData.props,
            }
        };
    }
}