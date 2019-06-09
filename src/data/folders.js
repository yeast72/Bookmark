export default {
    0: {
        _id: 0,
        name: 'folder1',
        bookmarks: [],
        childFolderId: [1, 2]
    },
    1: {
        _id: 1,
        name: 'folder2',
        bookmarks: [{
            _id: 1,
            title: 'Books 1',
            url: 'medium.com',
            completed: false,
            star: false
        }],
        childFolderId: []
    },
    2: {
        _id: 2,
        name: 'folder3',
        bookmarks: [{
            _id: 10,
            title: 'Books 10',
            url: 'medium.com',
            completed: false,
            star: false
        }],
        childFolderId: []
    }
}
// export default [{
//         _id: 1,
//         name: 'Web dev folder1',
//         createAt: '12312312',
//         updateAt: '123123123',
//         isRoot: true,
//         bookmarks: [{
//             _id: 1,
//             title: 'Books 1',
//             url: 'medium.com',
//             completed: false,
//             star: false
//         }, {
//             _id: 10,
//             title: 'Books 10',
//             url: 'medium.com',
//             completed: false,
//             star: false
//         }, {
//             _id: 9,
//             title: 'Books 9',
//             url: 'medium.com',
//             completed: false,
//             star: false
//         }],
//         children: [{
//             _id: 2,
//             name: 'Game3 folder2',
//             createAt: '999999999',
//             updateAt: '999999999',
//             isRoot: false,
//             bookmarks: [{
//                 _id: 4,
//                 title: 'GTA 56',
//                 url: 'medium.com',
//                 completed: false,
//                 star: false
//             }],
//             children: [{
//                 _id: 3,
//                 name: 'Game4 folder3',
//                 createAt: '999999999',
//                 updateAt: '999999999',
//                 isRoot: false,
//                 bookmarks: [{
//                     _id: 6,
//                     title: 'Rainbow 6',
//                     url: 'medium.com',
//                     completed: false,
//                     star: false
//                 }],
//             }]
//         }, {
//             _id: 4,
//             name: 'Game5 folder4',
//             createAt: '999999999',
//             updateAt: '999999999',
//             isRoot: false,
//             bookmarks: [{
//                 _id: 5,
//                 title: 'GTA 6',
//                 url: 'medium.com',
//                 completed: false,
//                 star: false
//             }]
//         }]
//     },
//     {
//         _id: 5,
//         name: 'Game folder5',
//         createAt: '999999999',
//         updateAt: '999999999',
//         isRoot: true,
//         bookmarks: [{
//             _id: 1,
//             title: 'GTA 5',
//             url: 'medium.com',
//             completed: false,
//             star: false
//         }]
//     }
// ]