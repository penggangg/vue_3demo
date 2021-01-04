/* eslint-disable @typescript-eslint/no-unused-vars */
const data = [
    {
        id: 1,
        fatherId: 0,
        status: 1,
        name: '生命科学竞赛',
        _child: [
            {
                id: 2,
                fatherId: 1,
                status: 1,
                name: '野外实习类',
                _child: [{ id: 3, fatherId: 2, status: 1, name: '植物学' }]
            },
            {
                id: 7,
                fatherId: 1,
                status: 1,
                name: '科学研究类',
                _child: [
                    {
                        id: 8,
                        fatherId: 7,
                        status: 1,
                        name: '植物学与植物生理学',
                        _child: [
                            { id: 91, fatherId: 8, status: 1, name: '最后一级' }
                        ]
                    },
                    { id: 9, fatherId: 7, status: 1, name: '动物学与动物生理学' },
                    { id: 10, fatherId: 7, status: 1, name: '微生物学' },
                    { id: 11, fatherId: 7, status: 1, name: '生态学' }
                ]
            },
            { id: 71, fatherId: 1, status: 1, name: '添加' }
        ]
    },
    {
        id: 56,
        fatherId: 0,
        status: 1,
        name: '考研相关',
        _child: [
            { id: 57, fatherId: 56, status: 1, name: '政治' },
            { id: 58, fatherId: 56, status: 1, name: '外国语' }
        ]
    }
];
export default data;
