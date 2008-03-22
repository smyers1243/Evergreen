
function _toStoreData (list, label, params) {

	// a sane default
	if (!params.identifier) params.identifier = 'id';

	var data = { label : 'shortname', identifier : 'id', items : [] };

	for (var i in list) data.items.push( list[i].toHash() );

	if (params.children && params['parent']) {
		var _hash_list = data.items;

		var _find_root = {};
		for (var i in _hash_list) {
			_find_root[_hash_list[i][params.identifier]] = _hash_list[i]; 
		}

		var item_data = [];
		for (var i in _hash_list) {
			var obj = _hash_list[i]
			obj[params.children] = [];

			for (var j in _hash_list) {
				var kid = _hash_list[j];
				if (kid[params['parent']] == obj[params.identifier]) {
					obj[params.children].push( { _reference : kid[params.identifier] } );
					kid._iskid = true;
					if (_find_root[kid[params.identifier]]) delete _find_root[kid[params.identifier]];
				}
			}

			item_data.push( obj );
		}

		for (var j in _find_root) {
			_find_root[j]['_top'] = 'true';
			if (!_find_root[j][params['parent']])
				_find_root[j]['_trueRoot'] = 'true';
		}

		data.items = item_data;
	}

	return data;
}

// set up the defaults
for (var i in fmclasses) window[i].toStoreData = _toStoreData;

aou.toStoreData = function (list, label) {
	if (!label) label = 'shortname';
	return _toStoreData(list, label, { 'parent' : 'parent_ou', 'children' : 'children' });
}

aout.toStoreData = function (list, label) {
	if (!label) label = 'name';
	return _toStoreData(list, label, { 'parent' : 'parent', 'children' : 'children' });
}

pgt.toStoreData = function (list, label) {
	if (!label) label = 'name';
	return _toStoreData(list, label, { 'parent' : 'parent', 'children' : 'children' });
}


