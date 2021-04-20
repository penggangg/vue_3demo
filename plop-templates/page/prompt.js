const path = require('path');
const fs = require('fs');
const getFolder = (path) => {
    const components = [];
    const files = fs.readdirSync(path);
    files.forEach(function(item) {
        const stat = fs.lstatSync(path + '/' + item);
        if (stat.isDirectory() === true) {
            components.push(path + '/' + item);
            components.push(...getFolder(path + '/' + item));
        }
    });
    return components;
};
module.exports = {
    description: '创建页面',
    prompts: [
        {
            type: 'list',
            name: 'path',
            message: '请选择页面创建目录',
            choices: ['src/pages', ...getFolder('src/pages')]
        },
        {
            type: 'input',
            name: 'name',
            message: '请输入文件名',
            validate: v => {
                if (!v || v.trim === '') {
                    return '文件名不能为空';
                } else {
                    return true;
                }
            }
        }
    ],
    actions: data => {
        const relativePath = path.relative('src/pages', data.path);
        console.log(data);
        const actions = [
            {
                type: 'add',
                // path: `${data.path}/{{dotCase name}}.vue`,
                path: `${data.path}/${data.name.replace(data.name[0], data.name[0].toUpperCase())}.vue`,
                templateFile: 'plop-templates/page/index.hbs',
                data: {
                    componentName: `${relativePath} ${data.name}`
                }
            }
        ];
        return actions;
    }
};
