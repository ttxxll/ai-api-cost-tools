# ADS AI模型开发部快速学习路线（面向AI部署/推理优化工程）

## 当前定位

你现在的方向不是传统互联网后端，而是：

- AI模型工程化
- 模型部署
- 推理优化
- 芯片适配
- 智驾AI Infra

你的目标不是：

```text
成为AI算法研究员
```

而是：

```text
快速成为能独立参与AI工程工作的工程师
```

---

# 一、总体学习顺序（非常重要）

必须按这个顺序：

```text
Python
→ Tensor
→ PyTorch
→ 模型推理
→ ONNX
→ 模型部署
→ 量化
→ dump/debug
```

不要跳跃学习。

---

# 二、第一阶段（必须优先完成）

## 目标

```text
能看懂组里的Python代码
```

时间：

```text
1~2周
```

---

# 1. Python（AI工程方向）

## 推荐资料

### B站搜索：

```text
Python 3 入门到实战 黑马程序员
```

---

## 重点学习：

- 基础语法
- 函数
- 类
- 文件
- 异常
- import

---

## 学到什么程度？

达到：

```python
def infer(img):
    result = model(img)
    return result
```

能顺畅看懂即可。

---

## 不需要学习：

- Flask
- Django
- asyncio
- 爬虫

---

# 三、第二阶段（核心中的核心）

## 目标

```text
真正理解 tensor
```

时间：

```text
3~5天
```

---

# 2. numpy（重点）

## 推荐资料

B站搜索：

```text
numpy 快速入门
```

---

## 必须掌握：

```python
shape
reshape
transpose
slice
broadcast
```

---

## 最重要的概念：

```python
x.shape
```

---

# 为什么重要？

因为：

```text
AI工程本质就是tensor流动
```

---

# 四、第三阶段（最关键）

## 目标

```text
建立AI工程认知
```

时间：

```text
1~2周
```

---

# 3. PyTorch（重点）

## 官方资料

https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html

只看：

- tensor
- autograd
- neural network

---

## 中文推荐

B站搜索：

```text
小土堆 pytorch
```

---

## 重点掌握：

### tensor

```python
torch.randn()
```

---

### shape

---

### model.forward()

---

### backward()

---

### 权重

```python
state_dict
```

---

### cuda

```python
.to(device)
```

---

## 学到什么程度？

能看懂：

```python
output = model(input)
loss.backward()
```

即可。

---

# 五、第四阶段（你们工作核心）

## 目标

```text
理解模型部署链路
```

时间：

```text
1周
```

---

# 4. ONNX（极其重要）

## 推荐资料

B站搜索：

```text
ONNX 模型部署
PyTorch转ONNX
```

---

## 重点理解：

### 什么是ONNX

本质：

```text
模型中间格式
```

---

### 为什么需要ONNX

因为：

```text
PyTorch不能直接上车
```

---

### graph

---

### 算子

---

### 动态shape

---

## 最终目标：

理解：

```text
pth
→ onnx
→ om
```

整个过程。

---

# 六、第五阶段（你们部门核心）

## 目标

```text
理解精度问题
```

时间：

```text
1周
```

---

# 5. 模型量化（重点）

你后面会大量接触：

- FP16
- INT8
- calibration
- scale
- 精度下降

---

## 推荐资料

B站搜索：

```text
模型量化 INT8
TensorRT量化
```

---

## 重点理解：

### FP32

### FP16

### INT8

### 为什么量化会掉精度

### calibration是什么

---

## 核心理解：

```text
低精度换性能
```

---

# 七、第六阶段（真正开始干活）

## 目标

```text
能debug
```

时间：

```text
持续学习
```

---

# 6. dump / 精度对齐

这是工业AI工程中的核心debug能力。

---

## 重点学习：

### 怎么dump tensor

### 怎么对比tensor

### 怎么定位误差层

### 怎么判断量化问题

---

## 最好的学习方式：

直接向同事学习。

---

# 八、Linux（必须同步学习）

## 工作环境

你后面大概率长期使用：

- Linux
- Docker
- GPU

---

# 7. Linux 必学命令

## 推荐资料

B站搜索：

```text
Linux常用命令 2小时
```

---

## 必须掌握：

```bash
cd
ls
grep
tail
top
ps
kill
vim
```

---

## GPU相关：

```bash
nvidia-smi
```

---

## Docker：

至少理解：

```bash
docker ps
docker exec
```

---

# 九、最重要的知识地图

你必须建立下面这条链路认知：

```text
数据
↓
训练
↓
权重(.pth)
↓
PyTorch模型
↓
导出ONNX
↓
模型转换
↓
OM
↓
NPU推理
↓
量化(INT8)
↓
精度下降
↓
dump分析
↓
逐层对齐
```

---

# 十、正确学习方式（非常重要）

不要：

```text
系统看课
```

效率很低。

---

# 正确方式：

```text
边工作边补知识
```

例如：

今天听到：

```text
allreduce
```

就只学：

```text
梯度规约是什么
```

---

今天遇到：

```text
shape错误
```

就专门学：

```python
reshape
permute
```

---

# 十一、最重要的实践建议

找一个组内代码工程。

---

## 第一步

先跑起来：

```bash
python infer.py
```

---

## 第二步

打印：

```python
print(tensor.shape)
```

---

## 第三步

观察：

```text
模型输入
模型输出
```

---

## 第四步

理解：

```text
数据是怎么流动的
```

---

# 十二、你当前最需要建立的能力

你不是在：

```text
从Java转Python
```

而是在：

```text
从互联网后端
转向AI系统工程
```

真正重要的是：

- Tensor理解能力
- 模型生命周期理解
- AI部署链路理解
- 精度问题分析能力
- 工程debug能力

---

# 十三、你后续的发展方向（高价值）

你未来很可能成长为：

- AI部署工程师
- 推理优化工程师
- 自动驾驶AI工程师
- AI Infra工程师
- 芯片适配工程师

这些方向在行业里都属于高壁垒、高价值岗位。
