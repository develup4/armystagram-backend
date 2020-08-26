export const COMMENT_FRAGMENT = `
    fragment CommetParts on Comment{
        id
        text
        user {
            username
        }
    }
`;
