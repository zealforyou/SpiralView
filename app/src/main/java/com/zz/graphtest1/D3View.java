package com.zz.graphtest1;

import android.animation.AnimatorSet;
import android.animation.ValueAnimator;
import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.view.View;
import android.view.animation.Interpolator;

/**
 * Created by zhuo.zhang on 2018/5/22.
 */

public class D3View extends View {

    private final Paint paint;
    private final ValueAnimator c1Anim;
    private final ValueAnimator c2Anim;
    private final ValueAnimator rectAnim;
    private float rectValue, c1Value, c2Value;
    private final AnimatorSet animatorSet;
    private int time = 3500;
    private float rectH;
    private float dd;

    public D3View(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        TypedArray typedArray = context.obtainStyledAttributes(attrs, R.styleable.D3View);
        dd = typedArray.getFloat(R.styleable.D3View_seek, 0);
        typedArray.recycle();
        paint = new Paint();
        paint.setColor(Color.WHITE);
        paint.setAntiAlias(true);
        rectAnim = ValueAnimator.ofFloat(1, -1, 1);
        c1Anim = ValueAnimator.ofFloat(1, 1.3f, 1, 0.7f, 1f);
        c2Anim = ValueAnimator.ofFloat(1, 0.7f, 1, 1.3f, 1f);
        rectAnim.setInterpolator(new MyInterpolator1());
        c1Anim.setInterpolator(new MyInterpolator());
        c2Anim.setInterpolator(new MyInterpolator());
        c1Anim.setRepeatCount(ValueAnimator.INFINITE);
        c2Anim.setRepeatCount(ValueAnimator.INFINITE);
        rectAnim.setRepeatCount(ValueAnimator.INFINITE);
        c1Anim.setRepeatMode(ValueAnimator.RESTART);
        c2Anim.setRepeatMode(ValueAnimator.RESTART);
        rectAnim.setRepeatMode(ValueAnimator.RESTART);
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
        animatorSet.setDuration(time);
        animatorSet.play(rectAnim).with(c1Anim).with(c2Anim);
        animatorSet.start();
    }

    public void setDeg(float d) {
        dd = d;
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);

        int width = getWidth();
        float rectW = width * 0.6f;
        rectH = 20;
        float r = rectH * 3;

//        int space = 50;

        float r1 = r * c1Value;
        float r2 = r * c2Value;
        float coe = rectValue;
        float top = 2 * r;
        float bottom = top + rectH;
        canvas.drawRect(width / 2 - rectW / 2 * Math.abs(coe), top,
                width / 2 + rectW / 2 * Math.abs(coe), bottom, paint);
        canvas.drawCircle(width / 2 - (rectW / 2 + r1) * coe, top + rectH / 2, r1, paint);
        canvas.drawCircle(width / 2 + (rectW / 2 + r2) * coe, top + rectH / 2, r2, paint);

    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        heightMeasureSpec = MeasureSpec.makeMeasureSpec((int) (1.5 * 2 * rectH * 3 + 30), MeasureSpec.EXACTLY);
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);

    }

    class MyInterpolator implements Interpolator {

        @Override
        public float getInterpolation(float input) {
            return (input + dd) % 1;
        }
    }
    class MyInterpolator1 implements Interpolator {

        @Override
        public float getInterpolation(float input) {
            return (input + dd) % 1;
        }
    }
}
