<?php
$this->breadcrumbs=array(
	'Admin Articles Models'=>array('index'),
	'Manage',
);

$this->menu=array(
	array('label'=>'List AdminArticlesModel', 'url'=>array('index')),
	array('label'=>'Create AdminArticlesModel', 'url'=>array('create')),
);

Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$.fn.yiiGridView.update('admin-articles-model-grid', {
		data: $(this).serialize()
	});
	return false;
});
");

?>

<h1>Manage Articles</h1>

<?php echo CHtml::link('Advanced Search','#',array('class'=>'search-button')); ?>
<div class="search-form" style="display:none">
<?php $this->renderPartial('_search',array(
	'model'=>$model,
)); ?>
</div><!-- search-form -->

<?php $this->widget('application.widgets.iGridView', array(
	'id'=>'admin-articles-model-grid',
	'dataProvider'=>new EMongoDocumentDataProvider($model->search(), array(
		'sort'=>array(
            'defaultOrder'=>'_id DESC',
			'attributes'=>array(
				'_id',
				'title',
				//'introtext',
				//'fulltext',
				'genre',
				//'tags',
				/*
				'views',
				'thumb',
				'comments',
				'url_source',
				'source',
				'created_datetime',
				'updated_datetime',
				'active_datetime',
				'created_by',
				'status',
				*/
			),
		),
	)),
	'filter'=>$model,
	'columns'=>array(
        array(
            'type'	=>	'raw',
            'header'	=>'<div id="sl-row" onclick="CoreJs.checkAll(this.id);" status="1"><input type="checkbox" class="checkall" value="" /></div>',
            'value'	=>	'CHtml::checkBox("rad_ID[]", "", array("value"=>$data->_id))',
            'htmlOptions'	=>	array(
                'width'	=>	'50',
            ),
        ),
		'_id',
        array(
            'name'=>'title',
            'type'=>'raw',
            'value'=>'CHtml::link($data->title,array("update","id"=>$data->_id))'
        ),
		//'introtext',
		//'fulltext',
		'genre',
		'tags',
        'views',
		/*
		'views',
		'thumb',
		'comments',
		'url_source',
		'source',
		'created_datetime',
		'updated_datetime',
		'active_datetime',
		'created_by',
		'status',
		*/
        array(
            'class'=>'application.widgets.iButtonColumn',
            'htmlOptions'=>array('style'=>'width: 50px'),
        ),
	),
)); ?>