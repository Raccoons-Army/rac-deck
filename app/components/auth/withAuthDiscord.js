export function withAuthDiscord(gssp) {
    return async (context) => {

        // if it doesnt has discord access token on a cookie
        if (!context.req.cookies.discordAcessTokenInfo) {
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