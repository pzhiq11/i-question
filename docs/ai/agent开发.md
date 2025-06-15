# AI 文件操作助手

这是一个基于 Gemini 模型的 AI 文件操作助手，可以执行基本的文件操作任务。

## 功能特点

- 文件读取
- 目录列表
- 文件重命名

## 安装依赖

```bash
pip install pydantic-ai
```

## 使用方法

1. 确保已安装所需依赖
2. 运行主程序：

```bash
python main.py
```

## 示例任务

程序包含以下示例任务：

- 列出 test 目录下的所有文件
- 读取 test/example.txt 文件的内容
- 将 test/old.txt 重命名为 test/new.txt

## 自定义任务

您可以通过修改 `main.py` 中的 `tasks` 列表来添加自定义任务。例如：

```python
tasks = [
    "列出指定目录下的所有文件",
    "读取特定文件的内容",
    "重命名文件"
]
```

## 注意事项

- 确保有适当的文件操作权限
- 文件路径使用相对路径
- 建议在 test 目录下进行文件操作测试

## main.py

```python
from pydantic_ai.models.gemini import GeminiModel
from tools import read_file, list_dir, rename_file
import json
from typing import Dict, Any

class FileAgent:
    def __init__(self):
        self.model = GeminiModel('gemini-2.5-flash-preview-04-17')
        self.available_tools = {
            'read_file': read_file,
            'list_dir': list_dir,
            'rename_file': rename_file
        }

    def process_task(self, task: str) -> Dict[str, Any]:
        # 构建系统提示
        system_prompt = f"""
        你是一个文件操作助手。你可以使用以下工具：
        - read_file(file_path): 读取文件内容
        - list_dir(dir_path): 列出目录内容
        - rename_file(file_path, new_name): 重命名文件

        请分析用户的任务，并返回一个包含以下字段的 JSON：
        {{
            "tool": "使用的工具名称",
            "parameters": {{工具参数}},
            "explanation": "解释你的操作"
        }}
        """

        # 获取 AI 的响应
        response = self.model.generate(system_prompt + "\n\n用户任务: " + task)

        try:
            # 解析 AI 的响应
            action = json.loads(response)

            # 执行操作
            if action["tool"] in self.available_tools:
                result = self.available_tools[action["tool"]](**action["parameters"])
                return {
                    "success": True,
                    "result": result,
                    "explanation": action["explanation"]
                }
            else:
                return {
                    "success": False,
                    "error": f"未知工具: {action['tool']}"
                }
        except Exception as e:
            return {
                "success": False,
                "error": f"执行失败: {str(e)}"
            }

def main():
    agent = FileAgent()

    # 示例任务
    tasks = [
        "列出 test 目录下的所有文件",
        "读取 test/example.txt 文件的内容",
        # "将 test/old.txt 重命名为 test/new.txt"
    ]

    for task in tasks:
        print(f"\n执行任务: {task}")
        result = agent.process_task(task)
        print(f"结果: {json.dumps(result, ensure_ascii=False, indent=2)}")

if __name__ == "__main__":
    main()


```


## tools.py 
```python
from pathlib import Path
import os

base_dir = Path('./test')

# 提供三个方法 ： 读取文件，列目录，重命名文件

def read_file(file_path : str) -> str:
    with open(file_path, 'r', encoding='utf-8') as f:
        return f.read()

def list_dir(dir_path : str) -> list[str]:
    return os.listdir(dir_path)

def rename_file(file_path : str, new_name : str):
    os.rename(file_path, new_name)


```