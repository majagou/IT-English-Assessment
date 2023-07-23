import os
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from mpl_toolkits.mplot3d import Axes3D
<<<<<<< HEAD
from flask import Flask,request
from flask import g
from flask import render_template
app = Flask(__name__)
=======
>>>>>>> 61773d838095cba79239487ddfef74dfc9a1715e

def radar_chart(scores, labels, name):
    # 计算每个变量对应的角度
    num_vars = len(labels)
    angles = np.linspace(0, 2 * np.pi, num_vars, endpoint=False).tolist()

    # 创建雷达图的子图
    fig, ax = plt.subplots(figsize=(6, 6), subplot_kw=dict(polar=True))

    # 将scores复制一份，并在最后一个元素之后添加第一个元素
    values = scores + scores[:1]
    angles += angles[:1]

    # 填充雷达图的区域
    ax.fill(angles, values, color='red', alpha=0.25)

    # 隐藏y轴刻度标签
    ax.set_yticklabels([])

    # 设置x轴刻度的位置和标签
    ax.set_xticks(np.linspace(0, 2 * np.pi, len(labels), endpoint=False))
    ax.set_xticklabels(labels)

    # 保存雷达图为图片
<<<<<<< HEAD
    plt.savefig(os.path.join("images/result/", f'{name}_radar.png'))
=======
    plt.savefig(os.path.join("./images/result/", f'{name}_radar.png'))
>>>>>>> 61773d838095cba79239487ddfef74dfc9a1715e
    plt.close()

def heatmap(scores, labels, name):
    # 将得分转换为矩阵形式，方便绘制热力图
    scores_matrix = [scores]

    # 创建热力图的子图
    fig, ax = plt.subplots()

    # 绘制热力图
    im = ax.imshow(scores_matrix, cmap='hot')

    # 设置x轴刻度和y轴刻度
    ax.set_xticks(np.arange(len(labels)))
    ax.set_yticks([])

    # 设置x轴刻度标签
    ax.set_xticklabels(labels)

    # 设置x轴刻度标签旋转角度和对齐方式
    plt.setp(ax.get_xticklabels(), rotation=45, ha="right", rotation_mode="anchor")

    # 在每个单元格上添加文本标签
    for i in range(len(scores)):
        text = ax.text(i, 0, scores[i], ha="center", va="center", color="w")

    # 保存热力图为图片
<<<<<<< HEAD
    plt.savefig(os.path.join("images/result/", f'{name}_heatmap.png'))
=======
    plt.savefig(os.path.join("./images/result/", f'{name}_heatmap.png'))
>>>>>>> 61773d838095cba79239487ddfef74dfc9a1715e
    plt.close()

def bar_3d(scores, labels, name):
    # 创建3D柱状图的画布和子图
    fig = plt.figure(figsize=(8, 6))
    ax = fig.add_subplot(111, projection='3d')

    # 设置柱状图的位置、高度和颜色
    x = np.arange(len(labels))
    y = np.ones(len(labels))
    z = scores

    # 绘制3D柱状图
    ax.bar3d(x, y, np.zeros(len(labels)), 1, 1, z)

    # 设置x轴刻度和标签
    ax.set_xticks(x)
    ax.set_xticklabels(labels)

    # 设置y轴标签和图表标题
    ax.set_ylabel('Score')
    ax.set_title('3D Bar Chart of Scores')

    # 保存3D柱状图为图片
<<<<<<< HEAD
    plt.savefig(os.path.join("images/result/", f'{name}_bar3d.png'))
    plt.close()

# 测试数据
# scores = [85, 90, 92, 89]
# labels = ['Listening', 'Matching', 'SingleSelect', 'Total']
# name = 'student1'

# 生成雷达图、热力图和3D柱状图
# radar_chart(scores, labels, name)
# heatmap(scores, labels, name)
# bar_3d(scores, labels, name)


def after_request(resp):
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Headers'] = '*'
    return resp


app.after_request(after_request)

@app.route("/createChart", methods=["POST"])
def createChart():
    name=request.form.get("name")
    listnings = int(request.form.get("listnings"))
    matchings = int(request.form.get("matchings"))
    singleSlections = int(request.form.get("singleSlections"))
    total=listnings+matchings+singleSlections
    scores = [listnings, matchings, singleSlections, total]
    labels = ['Listening', 'Matching', 'SingleSelect', 'Total']
    radar_chart(scores, labels, name)
    heatmap(scores, labels, name)
    bar_3d(scores, labels, name)
    return {"status_code":"200","message":"Registered successfully!"}

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
=======
    plt.savefig(os.path.join("./images/result/", f'{name}_bar3d.png'))
    plt.close()

# 测试数据
scores = [85, 90, 92, 88, 89]
labels = ['Listening', 'Speaking', 'Reading', 'Writing', 'Total']
name = 'student1'

# 生成雷达图、热力图和3D柱状图
radar_chart(scores, labels, name)
heatmap(scores, labels, name)
bar_3d(scores, labels, name)
>>>>>>> 61773d838095cba79239487ddfef74dfc9a1715e
