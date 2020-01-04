export const COMMENT_FRAGMENT = `
    id
    text
    user {
        name
    }
`;

export const USER_FRAGMENT = `
        id
        name
        avatar
`;

export const FILE_FRAGMENT = `
        id
        url
`;

export const MESSAGE_FRAGMENT = `
    id
    text
    to {
        ${USER_FRAGMENT}
    }
    from {
        ${USER_FRAGMENT}
    }
`;

// Post.js 에서 정의를 통해 더 이상 사용하지 않음
// export const FULL_POST_FRAGMENT = `
//     fragment PostParts on Post{
//         id
//         location
//         caption
//         files {
//             ${FILE_FRAGMENT}
//         }
//         comments {
//             ${COMMENT_FRAGMENT}
//         }
//         user {
//             ${USER_FRAGMENT}
//         }
//     }
// `;

export const ROOM_FRAGMENT = `
    fragment RoomParts on Room{
        id
        participants {
            ${USER_FRAGMENT}
        }
        messages {
            ${MESSAGE_FRAGMENT}
        }
    }
`;