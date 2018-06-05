package com.zz.graphtest1;

import android.animation.AnimatorSet;
import android.animation.ValueAnimator;
import android.content.Context;
import android.graphics.Camera;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.view.View;

/**
 * Created by zhuo.zhang on 2018/5/22.
 */

public class D3View1 extends View {

    private final Paint paint;
    private final Camera camera;
    private final Matrix matrix;
    private final ValueAnimator c1Anim;
    private final ValueAnimator c2Anim;
    private float d;
    private final ValueAnimator rectAnim;
    private float rectValue, c1Value, c2Value;
    private final AnimatorSet animatorSet;
    private int time = 5000;
    float count = 9;

    public D3View1(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        paint = new Paint();
        paint.setColor(Color.WHITE);
        paint.setAntiAlias(true);
        camera = new Camera();
        matrix = new Matrix();
        rectAnim = ValueAnimator.ofFloat(1, -1);
        c1Anim = ValueAnimator.ofFloat(1, 1.3f, 1);
        c2Anim = ValueAnimator.ofFloat(1, 0.7f, 1);
//        rectAnim.setInterpolator(new AccelerateInterpolator());
        rectAnim.setDuration(time);
        c1Anim.setDuration(time);
        c2Anim.setDuration(time);
        c1Anim.setRepeatCount(ValueAnimator.INFINITE);
        c2Anim.setRepeatCount(ValueAnimator.INFINITE);
        rectAnim.setRepeatCount(ValueAnimator.INFINITE);
        c1Anim.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
            @Override
            public void onAnimationUpdate(ValueAnimator animation) {
                c1Value = (float) animation.getAnimatedValue();
            }
        });
        c2Anim.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
            @Override
            public void onAnimationUpdate(ValueAnimator animation) {
                c2Value = (float) animation.getAnimatedValue();
            }
        });
        rectAnim.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
            @Override
            public void onAnimationUpdate(ValueAnimator animation) {
                rectValue = (float) animation.getAnimatedValue();
                invalidate();
            }
        });
        animatorSet = new AnimatorSet();
        animatorSet.play(rectAnim).with(c1Anim).with(c2Anim);
        animatorSet.start();
    }

    public void setDeg(float d) {
        this.d = d;
        invalidate();
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);

        int width = getWidth();
        float rectW = width * 0.5f;
        float rectH = 20;
        float r = rectH * 3;

        int space = 50;

        for (int i = 0; i < count; i++) {
            float r1 = r * getCoe1(1.5f, 1f, i, c1Value);
            float r2 = r * getCoe1(1f, 0.5f, i, c2Value);
            float coe = getCoe(1f, -1f, i, rectValue);
            float top = 2 * r * (i+1) + (i+1) * space;
            float bottom = top + 20;
            canvas.drawRect(width / 2 - rectW / 2 * Math.abs(coe), top,
                    width / 2 + rectW / 2 * Math.abs(coe), bottom, paint);
            canvas.drawCircle(width / 2 - (rectW / 2 + r1) * coe, top + rectH / 2, r1, paint);
            canvas.drawCircle(width / 2 + (rectW / 2 + r2) * coe, top + rectH / 2, r2, paint);

        }
    }

    float getCoe(float max, float min, int i, float value) {

        return value;
    }

    //大球
    float getCoe1(float max, float min, int i, float value) {
        float v = max - min;
        float df = i/10f;
        value = value - df;
        return value;
    }

    //小球
    float getCoe2(float max, float min, int i, float value) {
        float v = max - min;
        value = value - i / count * v;
        if (value < min) {
            value = min + (min - value);
        }
        return value;
    }
}
